drop database if exists library;
create database library;
use library;

create table Books(
    id integer primary key unique auto_increment,
    book_name varchar(50) not null,
    author varchar(50) not null,
    lend_date DATE not null,
    return_date DATE not null
);

insert into Books(book_name, author, lend_date, return_date) values
("O assassinato no Expresso do Oriente", "Agatha Christie", "2023-01-29", "2023-02-07"),
("Mistborn Primeira Era - O império final", "Brandon Sanderson", "2023-02-03", "2023-02-18"),
("O Senhor dos Anéis: A Sociedade do Anel", "J.R. R. TOLKIEN", "2023-01-16", "2023-01-30");

select * from Books;
