import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Import the fonts for pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Define the function to generate the PDF
const generatePDF = (petType: string, petAge: string): void => {
  if (!petType || !petAge) {
    alert("Please provide both pet type and pet age");
    return;
  }

  // Define the PDF document structure
  const documentDefinition: TDocumentDefinitions = {
    content: [
      { text: `Nutrition Guide for ${petType}`, style: "header" },
      { text: `Recommended Diet for Age: ${petAge}`, style: "subheader" },
      {
        text: "Nutrition Information:",
        style: "subheader",
      },
      {
        ul: getNutritionInfo(petType, petAge), // Call function to get nutrition info
      },
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 10], // Adjust to two-element array
      },
      subheader: {
        fontSize: 16,
        margin: [0, 5], // Adjust to two-element array
      },
    },
  };

  // Generate the PDF
  pdfMake
    .createPdf(documentDefinition)
    .download(`${petType}_nutrition_guide.pdf`);
};

// Sample function to return nutrition info based on pet type and age
const getNutritionInfo = (petType: string, petAge: string): string[] => {
  if (petType === "Dog" && petAge === "Puppy") {
    return [
      "High-quality puppy food with essential nutrients.",
      "Small and frequent meals throughout the day.",
      "Ensure a good balance of protein, fats, and carbohydrates.",
    ];
  } else if (petType === "Dog" && petAge === "Adult") {
    return [
      "Balanced adult dog food with essential nutrients.",
      "Portion-controlled meals twice a day.",
      "Ensure regular hydration.",
    ];
  } else if (petType === "Cat" && petAge === "Kitten") {
    return [
      "High-quality kitten food rich in protein.",
      "Feed small portions multiple times a day.",
      "Ensure omega-3 fatty acids for brain development.",
    ];
  } else if (petType === "Cat" && petAge === "Adult") {
    return [
      "Balanced adult cat food with essential nutrients.",
      "Two meals per day with regular hydration.",
      "Provide foods rich in taurine for heart health.",
    ];
  }
  return ["Generic Nutrition Item 1", "Generic Nutrition Item 2"];
};

// Define the type for the document definitions
type TDocumentDefinitions = {
  content: (Text | UnorderedList)[];
  styles: {
    [key: string]: Style; // Allow dynamic keys for styles
  };
};

// Define types for elements in the PDF
type Text = {
  text: string;
  style: string;
};

type UnorderedList = {
  ul: string[];
};

type Style = {
  fontSize: number;
  bold?: boolean;
  margin?: [number, number] | [number, number, number, number]; // Specify margin as tuple
};

export default generatePDF;
