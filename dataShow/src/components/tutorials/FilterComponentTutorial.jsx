import React, { useState, useEffect } from "react";
import { Steps, Hints } from "intro.js-react";

import "intro.js/introjs.css";
//translation
import { useTranslation } from "react-i18next";

const FilterComponentTutorial = ({ onStepsEnabled, onStepsExit }) => {
  const { i18n } = useTranslation(); // Use the useTranslation hook to get i18n

  const [steps, setSteps] = useState([
    {
      element: "#step1",
      intro: "english",
    },
    {
      element: "#step2",
      intro: "hola 2",
    },
    {
      element: "#step3",
      intro: "3 step",
    },
    {
      element: "#step4",
      intro: "4 step",
    },
    {
      element: "#step5",
      intro: "5 step",
    },
    {
      element: "#step6",
      intro: "6 step",
    },
    {
      element: "#step7",
      intro: "7 step",
    },
    {
      element: "#step8",
      intro: "8 step",
    },
    {
      element: "#step9",
      intro: "9 step",
    },
  ]);

  const [initialStep, setInitialStep] = useState(0);
  useEffect(() => {
    if (i18n.resolvedLanguage === "de") {
      // Update the `steps` array based on the resolved language
      setSteps([
        {
          element: "#step1",
          intro:
            "Klicken Sie bitte hier, um die Daten nach den von Ihnen gewählten Kriterien zu filtern",
        },
        {
          element: "#step2",
          intro:
            "Mit dieser Taste werden die vom Benutzer ausgewählten Elemente angezeigt. Mit dem Pluszeichen hinter jedem Element können Sie die Liste erweitern.",
        },
        {
          element: "#step3",
          intro:
            "Diese Taste zeigt zusätzliche Merkmale zu den in der Haupttabelle enthaltenen Elementen an.",
        },
        {
          element: "#step4",
          intro:
            "Mit dieser Taste können Sie den aktuellen Inhalt der Haupttabelle in ein Dokument im .xlsx-Format (MS Excel oder ähnlich) exportieren",
        },
        {
          element: "#step5",
          intro:
            "Exportieren Sie den Inhalt der Datei socialbnb-listings.csv im Format .xlsx (MS Excel oder ähnlich), die resultierende Datei umfasst nicht den Inhalt der Datei socialbnb-users.csv . ",
        },
        {
          element: "#step6",
          intro:
            "Zeigt die Anzahl der sichtbaren Elemente im Verhältnis zu den Ländern in der Auswahl. ",
        },
        {
          element: "#step7",
          intro:
            "Erweitern Sie das Panel, um die Datenquellen zu ändern. Für zusätzliche Informationen fügen Sie bitte die Datei socialbnb-users.csv ein. Dies ermöglicht Querverweise durch Zusammenführen der Daten in den beiden .csv-Dateien",
        },
        {
          element: "#step8",
          intro:
            "Mit dieser Taste können Sie die Sprache für die Kopfzeilen und die grafische Oberfläche auswählen",
        },
      ]);
    }
    if (i18n.resolvedLanguage === "es") {
      // Update the `steps` array based on the resolved language
      setSteps([
        {
          element: "#step1",
          intro:
            "Haga clic aquí para filtrar los datos según los criterios seleccionados",
        },
        {
          element: "#step2",
          intro:
            "Este botón muestra los los elementos seleccionados por el usuario.El signo de adición detrás de cada elemento permite incrementar la lista.  ",
        },
        {
          element: "#step3",
          intro:
            "Este botón muestra caracteristicas adicionales sobre los elementos contenidos en la tabla principal",
        },
        {
          element: "#step4",
          intro:
            "Utilize este botón para exportar el contenido incluido en la tabla principal en este momento a un documento en formato .xlsx (MS Excel o similar)",
        },
        {
          element: "#step5",
          intro:
            "Exporte el contenido del archivo socialbnb-listings.csv en formato .xlsx (MS Excel o similar).El archivo resultante no incluirá el contenido de socialbnb-users.csv . ",
        },
        {
          element: "#step6",
          intro:
            "Muestra el contenido en forma gráfica.La cantidad de elementos visibles en relación a los países en la selección. ",
        },
        {
          element: "#step7",
          intro:
            "Expanda el panel para modificar las fuentes de informacion. Para obtener información adicional por favor incluya el archivo socialbnb-users.csv .Esto permite realizar una referencia cruzada al mezclar datos incluidos en los dos archivos .csv   ",
        },
        {
          element: "#step8",
          intro:
            "Utilice este botón para seleccionar el idioma de los encabezados y la interfaz gráfica.",
        },

        // ... (other German translations)
      ]);
    }
    if (i18n.resolvedLanguage === "en") {
      setSteps([
        {
          element: "#step1",
          intro:
            "Click please here for filtering the data according to your selected criteria",
        },
        {
          element: "#step2",
          intro:
            "This button displays the items selected by the user, the plus sign behind each item allows you to increment the list.",
        },
        {
          element: "#step3",
          intro:
            "This button shows additional characteristics of the elements contained in the main table.",
        },
        {
          element: "#step4",
          intro:
            "Use this button to export the content included in the main table at this time to a document in .xlsx format (MS Excel or similar).",
        },
        {
          element: "#step5",
          intro:
            "Export the contents of the socialbnb-listings.csv file in .xlsx format (MS Excel or similar).The resulting file will not include the contents of socialbnb-users.csv . ",
        },
        {
          element: "#step6",
          intro:
            "Displays the content in graphical form.The number of visible items in relation to the countries in the selection. ",
        },
        {
          element: "#step7",
          intro:
            "Expand the panel to modify the data sources. For additional information please include the file socialbnb-users.csv. This allows cross-referencing by merging data included in the two .csv files",
        },
        {
          element: "#step8",
          intro:
            "Use this button to select the language of the headers and the graphical interface.",
        },
      ]);
    }
  }, [i18n.resolvedLanguage]);

  return (
    <div>
      <Steps
        enabled={onStepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onStepsExit}
      />
    </div>
  );
};

export default FilterComponentTutorial;
