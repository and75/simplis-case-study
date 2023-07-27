<?php

namespace App\Entity;

use App\Repository\PricesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PricesRepository::class)]
class Prices
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $price = null;

    #[ORM\Column]
    private ?float $price_tt = null;

    #[ORM\Column]
    private ?int $time_created = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_created = null;


    public function __construct(){}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getPriceTt(): ?float
    {
        return $this->price_tt;
    }

    public function setPriceTt(float $price_tt): static
    {
        $this->price_tt = $price_tt;

        return $this;
    }

    public function getTimeCreated(): ?int
    {
        return $this->time_created;
    }

    public function setTimeCreated(int $time_created): static
    {
        $this->time_created = $time_created;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->date_created;
    }

    public function setDateCreated(\DateTimeInterface $date_created): static
    {
        $this->date_created = $date_created;

        return $this;
    }

    
}
