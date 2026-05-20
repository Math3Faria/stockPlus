create database if not exists stockPlus;
use stockPlus;

create table if not exists Categorias(
    idCategoria int auto_increment primary key,
    descricao varchar (55) not null
);

create table if not exists Fornecedores(
    idFornecedor int auto_increment primary key,
    empresa varchar(80) not null,            
    email varchar(70) not null,
    cnpj char(14) not null
);

create table if not exists Produtos(
    idProduto int auto_increment primary key,
    idCategoria int not null,
    idFornecedor int not null,
    nomeProduto varchar(100) not null,
    valor decimal(10,2) not null,
    dataVencimento DATE NOT NULL,
    quantidade int not null default 0,
    qtdMax int not null default 0,
    qtdMin int not null default 0,
    imagemProduto varchar(150) not null,
    dataCad timestamp default current_timestamp,
    foreign key (idCategoria) references Categorias(idCategoria),
    foreign key (idFornecedor) references Fornecedores(idFornecedor)
);

create table if not exists Itens_Fornecedores(
    idProduto int not null,
    idFornecedor int not null,
    foreign key (idProduto) references Produtos(idProduto),
    foreign key (idFornecedor) references Fornecedores(idFornecedor)
);

create table if not exists Estoque(
    idEstoque int auto_increment primary key,
    idProduto int not null,
    qtdAtual int not null,
    qtdMinima int not null,
    qtdMaxima int not null,
    foreign key (idProduto) references Produtos(idProduto)
);

create table if not exists MovimentacaoEstoque(
<<<<<<< HEAD
    idMovimentacao int auto_increment primary key,
    idProduto int not null,
    tipo VARCHAR(20) not null,
    quantidade int not null,
    dataValidade date null,
    descricao varchar(150) null,
    dataMovimentacao timestamp default current_timestamp,
    foreign key (idProduto) references Produtos(idProduto)
=======
idMovimentacao int auto_increment primary key,
idProduto int not null,
tipo VARCHAR(20) not null,
quantidade int not null,
dataValidade date null,
descricao varchar(150) null,
dataMovimentacao timestamp default current_timestamp,
foreign key (idProduto) references Produtos(idProduto)
>>>>>>> lucas_ferreira1
);

create table if not exists Lotes(
    idLote int auto_increment primary key,
    idProduto int not null,
    quantidadeEntrada int not null,    
    dataValidade date not null,
    dataEntrada timestamp default current_timestamp,
    foreign key (idProduto) references Produtos(idProduto)
);

create table if not exists Alerta (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    idProduto INT NOT NULL,
    mensagem VARCHAR(255) NOT NULL,
    dataGeracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foiVisualizado BOOLEAN DEFAULT FALSE,
    foreign key (idProduto) references Produtos(idProduto)
);

DELIMITER $$
<<<<<<< HEAD
CREATE PROCEDURE proc_verificar_vencimento()
BEGIN 
    SELECT idProduto, quantidadeEntrada, dataValidade, DATEDIFF(dataValidade, CURDATE()) AS dias_para_vencer 
    FROM Lotes 
    WHERE DATEDIFF(dataValidade, CURDATE()) = 45 OR DATEDIFF(dataValidade, CURDATE()) = 90; 
=======

CREATE TRIGGER trg_atualizar_estoque
AFTER INSERT ON MovimentacaoEstoque
FOR EACH ROW
BEGIN

    IF NEW.tipo = 'ENTRADA' THEN

        UPDATE Estoque
        SET qtdAtual = qtdAtual + NEW.quantidade
        WHERE idProduto = NEW.idProduto;


        IF NEW.dataValidade IS NOT NULL
        AND NEW.descricao IS NOT NULL
        AND LOWER(NEW.descricao) LIKE '%lote%' THEN

            INSERT INTO Lotes
            (
                idProduto,
                quantidadeEntrada,
                dataValidade
            )
            VALUES
            (
                NEW.idProduto,
                NEW.quantidade,
                NEW.dataValidade
            );

        END IF;

    ELSEIF NEW.tipo = 'SAIDA' THEN

        UPDATE Estoque
        SET qtdAtual = qtdAtual - NEW.quantidade
        WHERE idProduto = NEW.idProduto;

    END IF;

>>>>>>> lucas_ferreira1
END$$
DELIMITER ;

<<<<<<< HEAD
DELIMITER $$
CREATE TRIGGER trg_atualizar_estoque AFTER INSERT ON MovimentacaoEstoque FOR EACH ROW BEGIN IF NEW.tipo = 'ENTRADA' THEN UPDATE Estoque SET qtdAtual = qtdAtual + NEW.quantidade WHERE idProduto = NEW.idProduto; IF NEW.dataValidade IS NOT NULL AND NEW.descricao IS NOT NULL AND LOWER(NEW.descricao) LIKE '%lote%' THEN INSERT INTO Lotes (idProduto, quantidadeEntrada, dataValidade) VALUES (NEW.idProduto, NEW.quantidade, NEW.dataValidade); END IF; ELSEIF NEW.tipo = 'SAIDA' THEN UPDATE Estoque SET qtdAtual = qtdAtual - NEW.quantidade WHERE idProduto = NEW.idProduto; END IF; END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_gerarAlertas()
BEGIN
    DELETE FROM Alerta;
    
    INSERT INTO Alerta (tipo, idProduto, mensagem)
    SELECT 'VENCIMENTO_90', idProduto, 'Produto com 90 dias para vencer'
    FROM Produtos 
    WHERE DATEDIFF(dataVencimento, CURDATE()) = 90;

    INSERT INTO Alerta (tipo, idProduto, mensagem)
    SELECT 'VENCIMENTO_45', idProduto, 'Produto com 45 dias para vencer'
    FROM Produtos 
    WHERE DATEDIFF(dataVencimento, CURDATE()) = 45;
END$$
DELIMITER ;

CREATE EVENT evt_alertasDiarios
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO CALL sp_gerarAlertas();

CALL sp_gerarAlertas();
SELECT * FROM Alerta
=======
DELIMITER ;


>>>>>>> lucas_ferreira1
