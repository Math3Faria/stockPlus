create database  stockPlus;
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
idMovimentacao int auto_increment primary key,
idProduto int not null,
tipo VARCHAR(20) not null,
quantidade int not null,
dataMovimentacao timestamp default current_timestamp,
foreign key (idProduto) references Produtos(idProduto)
);


create table if not exists Lotes(
idLote int auto_increment primary key,
idProduto int not null,
quantidadeEntrada int not null,    
dataValidade date not null,
dataEntrada timestamp default current_timestamp,
foreign key (idProduto) references Produtos(idProduto)
);

DELIMITER $$
CREATE TRIGGER trg_adicionar_estoque_produto AFTER INSERT ON Produtos FOR EACH ROW BEGIN INSERT INTO Estoque (idProduto, qtdAtual, qtdMinima, qtdMaxima) VALUES (NEW.idProduto, NEW.quantidade, NEW.qtdMin, NEW.qtdMax); END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_produto_inserido AFTER INSERT ON Produtos FOR EACH ROW BEGIN INSERT INTO Estoque (idProduto, qtdAtual, qtdMinima, qtdMaxima) VALUES (NEW.idProduto, NEW.quantidade, NEW.qtdMin, NEW.qtdMax);
INSERT INTO Lotes (idProduto, quantidadeEntrada, dataValidade) VALUES (NEW.idProduto, NEW.quantidade, NEW.dataVencimento); END$$
DELIMITER ;