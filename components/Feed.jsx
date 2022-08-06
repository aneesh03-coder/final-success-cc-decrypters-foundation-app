import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { useSelector } from "react-redux";
import CardDisplay from "./CardDisplay";

function Feed() {
  const [info, setInfo] = useState([]);
  const allCampaigns = useSelector((state) => state.campaign?.allCampaigns[0]);

  useEffect(() => {
    setInfo(allCampaigns);
  }, [allCampaigns]);

  // const Title =
  //   'Rahul is really struggling for his life and needs an immediate liver transplant';
  //   const Description =
  //     'Rahul is really struggling for his life and needs an immediate liver transplant. liver transplant is a surgery that removes a liver that no longer functions properly (liver failure) and replaces it with a healthy liver from a deceased donor or a portion of a healthy liver from a living donor. Please help';
  //     const patientImage =
  //       'https://my.viewmedica.com/thumbs/alzheimers_1280.jpg?v=20151114';
  return (
    <div className="max-w-6xl border-2 p-3">
      <div className="flex items-center justify-between mb-5">
        <h1 className="p-5 pb-0 text-xl font-bold">
          Fundraisers in your communnity
        </h1>
        <BiRefresh
          className="w-8 h-8 mt-5 mr-5 cursor-pointer text-red-500 
            transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <div className="flex min-h-screen flex-col overflow-y-scroll scrollbar-hide">
        {info.map(({ id, patient_image, patient_description, Title }) => (
          <div key={id}>
            <CardDisplay
              id={id}
              Title={Title}
              caseDescription={patient_description}
              patientImage={patient_image}
            />
          </div>
        ))}

        {/* <CardDisplay Title={Title} caseDescription={Description} paientImage={patientImage}/>
            <CardDisplay Title={Title} caseDescription={Description} paientImage={patientImage}/>
            <CardDisplay Title={Title} caseDescription={Description} paientImage={patientImage}/>
            <CardDisplay Title={Title} caseDescription={Description} paientImage={patientImage}/>
            <CardDisplay Title={Title} caseDescription={Description} paientImage={patientImage}/> */}
      </div>
    </div>
  );
}

export default Feed;
