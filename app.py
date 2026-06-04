from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import mysql.connector
import os
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'almoxarifado_secret_key'

def conectar():
    return mysql.connector.connect(
        host='localhost',
        port=3306,
        user='root',
        password='',
        database='almoxarifado'
    )

# MUDAR ROTA DA PÁGINA
@app.route('/')
def home():
    return render_template('index.html')

# ENTRADA E SAÍDA
@app.route('/tabela')
def tabela():
    conexao = mysql.connector.connect(
        host= 'localhost',
        port = 3306,    
        user = 'root',
        password = '',
        database = 'almoxarifado'
    )
    cursor = conexao.cursor()
    cursor.execute("SELECT * FROM estoque")

    resultado = cursor.fetchall()

    return render_template('tabela.html', resultado=resultado)

@app.route('/editar')
def movimentar():
    return render_template('editar.html')

@app.route('/entrada', methods=['POST'])
def entrada():

    nome = request.form.get('nome')
    qtde = int(request.form.get('qtde'))
    responsavel = request.form.get('responsavel')
    tipo = request.form.get('tipo')
    imagem = request.files.get("imagem")

    conexao = mysql.connector.connect(
        host='localhost',
        port=3306,
        user='root',
        password='',
        database='almoxarifado'
    )

    cursor = conexao.cursor()

    # =========================
    # 1. SALVAR IMAGEM PRIMEIRO
    # =========================
    if imagem:
        nome_arquivo = secure_filename(imagem.filename)

        pasta = "static/uploads"
        os.makedirs(pasta, exist_ok=True)

        caminho_salvar = os.path.join(pasta, nome_arquivo)
        imagem.save(caminho_salvar)

        caminho_imagem = "/" + caminho_salvar.replace("\\", "/")
    else:
        caminho_imagem = None

    # =========================
    # 2. ENTRADA
    # =========================
    if tipo == "entrada":

        sql = """
        INSERT INTO estoque (responsavel, nome, qtde, imagem)
        VALUES (%s, %s, %s, %s)
        """

        cursor.execute(sql, (responsavel, nome, qtde, caminho_imagem))

    # =========================
    # 3. SAÍDA
    # =========================
    elif tipo == "saida":

        sql = """
        UPDATE estoque
        SET qtde = qtde - %s
        WHERE nome = %s
        """

        cursor.execute(sql, (qtde, nome))

    conexao.commit()
    cursor.close()
    conexao.close()

    return jsonify({"success": True})

# EXCLUIR LINHA
@app.route('/excluir/<int:id>', methods=['DELETE'])
def excluir(id):

    conexao = mysql.connector.connect(
        host='localhost',
        port=3306,
        user='root',
        password='',
        database='almoxarifado'
    )

    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM estoque WHERE id = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return jsonify({"success": True})


# LOGIN E LOGOUT + CADASTRO
@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    senha = request.form.get('senha')

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
    usuario = cursor.fetchone()
    cursor.close()
    conexao.close()

    if not usuario:
        return jsonify({"success": False, "mensagem": "E-mail não encontrado."})

    if not check_password_hash(usuario['senha'], senha):
        return jsonify({"success": False, "mensagem": "Senha incorreta."})

    session['usuario_id'] = usuario['id']
    session['nome']       = usuario['nome']
    session['perfil']     = usuario['perfil']

    return jsonify({"success": True})

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

@app.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')

@app.route('/cadastro', methods=['POST'])
def cadastro_post():
    nome   = request.form.get('nome')
    email  = request.form.get('email')
    senha  = request.form.get('senha')
    perfil = request.form.get('perfil', 'usuario')

    senha_hash = generate_password_hash(senha)

    try:
        conexao = conectar()
        cursor = conexao.cursor()
        cursor.execute(
            "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (%s, %s, %s, %s)",
            (nome, email, senha_hash, perfil)
        )
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({"success": True})
    except mysql.connector.IntegrityError:
        return jsonify({"success": False, "mensagem": "E-mail já cadastrado."})



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)