<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230724141603 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE activities (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, coverage LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE agreements (id INT AUTO_INCREMENT NOT NULL, customer_id INT DEFAULT NULL, activity_id INT DEFAULT NULL, date DATETIME DEFAULT NULL, time VARCHAR(255) DEFAULT NULL, INDEX IDX_27234E809395C3F3 (customer_id), INDEX IDX_27234E8081C06096 (activity_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE customers (id INT AUTO_INCREMENT NOT NULL, raison_sociale VARCHAR(255) NOT NULL, siret VARCHAR(255) NOT NULL, adresse_postale VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, telephone INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE prices (id INT AUTO_INCREMENT NOT NULL, price DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE agreements ADD CONSTRAINT FK_27234E809395C3F3 FOREIGN KEY (customer_id) REFERENCES customers (id)');
        $this->addSql('ALTER TABLE agreements ADD CONSTRAINT FK_27234E8081C06096 FOREIGN KEY (activity_id) REFERENCES activities (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE agreements DROP FOREIGN KEY FK_27234E809395C3F3');
        $this->addSql('ALTER TABLE agreements DROP FOREIGN KEY FK_27234E8081C06096');
        $this->addSql('DROP TABLE activities');
        $this->addSql('DROP TABLE agreements');
        $this->addSql('DROP TABLE customers');
        $this->addSql('DROP TABLE prices');
    }
}
