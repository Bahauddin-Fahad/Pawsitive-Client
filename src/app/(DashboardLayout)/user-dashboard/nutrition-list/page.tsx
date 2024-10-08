"use client";

import SectionTitle from "@/src/app/(CommonLayout)/_components/SectionTitle";
import generatePDF from "@/src/utils/generatePDF";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Key, useState } from "react";

const NutritionPage: React.FC = () => {
  const [petType, setPetType] = useState<string>("");
  const [petAge, setPetAge] = useState<string>("");

  const handleGeneratePDF = (): void => {
    generatePDF(petType, petAge);
  };
  const handlePetTypeSelect = (key: Key) => {
    setPetType(String(key));
  };
  const handlePetAgeSelect = (key: Key) => {
    setPetAge(String(key));
  };
  console.log(petType);
  console.log(petAge);

  return (
    <div className="container mx-auto p-4">
      <SectionTitle
        sub="HAVE BEST SUGGESION"
        heading="NUTRITION GUIDE FOR PETS"
      />
      <div className="flex gap-2 items-center mt-8">
        <Dropdown>
          <DropdownTrigger className="w-full">
            <Button color="secondary" variant="bordered" className="capitalize">
              {petType || "Pet Type"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Select Pet Type"
            color="secondary"
            variant="bordered"
            onAction={handlePetTypeSelect}
          >
            <DropdownItem key="Dog">Dog</DropdownItem>
            <DropdownItem key="Cat">Cat</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger className="w-full">
            <Button color="secondary" variant="bordered" className="capitalize">
              {petAge || "Pet Age"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Select Pet Age"
            color="secondary"
            variant="bordered"
            onAction={handlePetAgeSelect}
          >
            <DropdownItem key="Puppy">Puppy</DropdownItem>
            <DropdownItem key="Kitten">Kitten</DropdownItem>
            <DropdownItem key="Adult">Adult</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button
          onClick={handleGeneratePDF}
          className="btn btn-success bg-primary text-black font-semibold"
        >
          Generate PDF
        </Button>
      </div>
    </div>
  );
};

export default NutritionPage;
