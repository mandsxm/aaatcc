from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tabela')
def tabela():
    conexao = mysql.connector.connect(
        host= 'localhost',
        port = 3306,    
        username = 'root',
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

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)