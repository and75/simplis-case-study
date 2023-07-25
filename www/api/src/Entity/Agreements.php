<?php

namespace App\Entity;

use App\Repository\AgreementsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AgreementsRepository::class)]
class Agreements
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'activity')]
    private ?Customers $customer = null;

    #[ORM\ManyToOne(inversedBy: 'agreements')]
    private ?Activities $activity = null;

    #[ORM\Column(length: 100)]
    private ?string $time_created = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_created = null;

    #[ORM\Column(length: 10)]
    private ?string $status = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $date_signed = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $time_signed = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCustomer(): ?Customers
    {
        return $this->customer;
    }

    public function setCustomer(?Customers $customer): static
    {
        $this->customer = $customer;

        return $this;
    }

    public function getActivity(): ?Activities
    {
        return $this->activity;
    }

    public function setActivity(?Activities $activity): static
    {
        $this->activity = $activity;

        return $this;
    }

    public function getTimeCreated(): ?string
    {
        return $this->time_created;
    }

    public function setTimeCreated(string $time_created): static
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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getDateSigned(): ?\DateTimeInterface
    {
        return $this->date_signed;
    }

    public function setDateSigned(?\DateTimeInterface $date_signed): static
    {
        $this->date_signed = $date_signed;

        return $this;
    }

    public function getTimeSigned(): ?string
    {
        return $this->time_signed;
    }

    public function setTimeSigned(?string $time_signed): static
    {
        $this->time_signed = $time_signed;

        return $this;
    }
}
