<?php

namespace App\Entity;

use App\Repository\ActivitiesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ActivitiesRepository::class)]
class Activities
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    public ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $coverage = null;

    #[ORM\OneToMany(mappedBy: 'activity', targetEntity: Agreements::class)]
    private Collection $agreements;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Prices $price = null;

    #[ORM\Column(length: 100)]
    private ?string $time_created = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_created = null;

    public function __construct()
    {
        $this->agreements = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCoverage(): ?string
    {
        return $this->coverage;
    }

    public function setCoverage(string $coverage): static
    {
        $this->coverage = $coverage;

        return $this;
    }

    /**
     * @return Collection<int, Agreements>
     */
    public function getAgreements(): Collection
    {
        return $this->agreements;
    }

    public function addAgreement(Agreements $agreement): static
    {
        if (!$this->agreements->contains($agreement)) {
            $this->agreements->add($agreement);
            $agreement->setActivity($this);
        }

        return $this;
    }

    public function removeAgreement(Agreements $agreement): static
    {
        if ($this->agreements->removeElement($agreement)) {
            // set the owning side to null (unless already changed)
            if ($agreement->getActivity() === $this) {
                $agreement->setActivity(null);
            }
        }

        return $this;
    }

    public function getPrice(): ?Prices
    {
        return $this->price;
    }

    public function setPrice(?Prices $price): static
    {
        $this->price = $price;

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
}
