import React,{useState} from 'react';

import { useRouter } from "next/router";

import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {AiOutlineCloudUpload } from 'react-icons/ai';
import {MdDelete} from "react-icons/md";

import { getSession,  signIn, signOut } from "next-auth/react";

import { Storage } from "../firebase"
import firebase from "firebase/compat/app";
import { serverTimestamp } from "firebase/firestore";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const schema = yup.object().shape({
  caseTitle: yup.string().required('The case title is required!'),
  requesterContact: yup.string().required('The requester contact is required!'),
  patientAddress: yup.string().required('The patient address is required!'),
  patientDescription: yup.string().required('The Description field is required!'),
  amountGoal: yup.number().required('The amount goal is required!'),
  patientAge: yup.number().positive().integer().required('The patient age is required!'),
  patientGender: yup.string().required('The patient gender is required!'),
  patientName: yup.string().required('The patient name is required!'),
  relation: yup.string().required('The relation is required!'),

})

function Request({Session}) {
  const router = useRouter();

  const [patientImage, setPatientImage] = useState(null)
  const[loading, SetLoading] = useState(false)
  const [wrongImageType, setWrongImageType] = useState(false)


  const {register, handleSubmit,formState: { errors },reset,} = useForm({
    resolver: yupResolver(schema),
  })

  const handleSubmitData = async (data)=>{
    const newCampaign = {
      patient_image: patientImage,
      Title: data.caseTitle,
      goal: data.amountGoal,
      patient_address: data.patientAddress,
      patient_age: data.patientAge,
      patient_description: data.patientDescription,
      patient_gender: data.patientGender,
      patient_name: data.patientName,
      relation: data.relation,
      requester_contact: data.requesterContact,
      createdAt: serverTimestamp(),

  }

  try {
    const response = await fetch("/api/addCampaign", {
      method: "POST",
      body: JSON.stringify({ newCampaign }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
    successNotification();

    reset({
      caseTitle: "",
      requesterContact: "",
      patientAddress: "",
      patientDescription: "",
      amountGoal: "",
      patientAge: "",
      patientGender: "",
      patientName: "",
      relation: "",
     
    });
    setPatientImage(null)

    setTimeout(() => {
      router.replace("/");
      
    }, 6000);

  } catch (err) {
    errorNotification();
  }

  console.log(newCampaign)

  }


  const successNotification = () =>
  toast.success("You request have been submitted successfully", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
const errorNotification = () =>
  toast.error("Oh oh! Something went wrong!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const uploadImage =(e)=>{
   
    const types = ["image/jpeg", "image/png"];

    let selectedFile = e.target.files[0];
   

    if(selectedFile && types.includes(selectedFile.type)){
      setWrongImageType(false);
      SetLoading(true);

    //console.log(selectedFile, type)
    const uploadTask = Storage.ref(`/images/${selectedFile.name}`).put(selectedFile);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload progress
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //setProgress(percentage);
        console.log(percentage + "% Done");
      },
      console.error,
      () => {
        //when upload is complete
        Storage.ref(`/images/${selectedFile.name}`)
          .getDownloadURL()
          .then((url) => {
            //setFile(null);
  
            setPatientImage(url);
            console.log("uploaded url:", url);
            
          });
          SetLoading(false);
      }
      
    );

  }else{

    setWrongImageType(true);
  }


  }
  if (!Session?.user) {
    signIn("google");
  }






  return (
    <div className="w-full h-screen mt-8 mb-8">

    {!Session ? (
      <div className="w-full h-full flex justify-center place-items-center text-3xl text-red-500">
      You need to login to start a new campaign.Redirecting you to login...
    </div>

    ):(
<div className="flex w-full h-full justify-center items-center">


         <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>

  <form onSubmit={handleSubmit(handleSubmitData)} className="flex flex-col space-y-4 max-w-[700px] items-center justify-center w-full mx-auto bg-slate-100 p-8 px-8 rounded-lg">
  <h3 className="text-4xl text-center my-6">Request a case</h3>


  <div className="flex flex-col justify-center items-center  border-2 border-dotted border-gray-300 p-3 w-full h-420 ">

{wrongImageType && <p className="text-xs text-red-500">Wrong Image Type</p>}
{!patientImage ? (
  <label className="flex">
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col justify-center items-center">
        <div className="font-bold text-2xl">
          {loading ? (
            <p className="flex text-center animate-pulse text-green-900">
              Loading...
            </p>
          ) : (
            <div className="flex flex-col items-center cursor-pointer">
              <AiOutlineCloudUpload />
              <p className="text-sm">Click to Upload Patient's Image</p>
            </div>
          )}
        </div>
      </div>
    </div>
    <input   type="file" className="w-0 h-0" onChange={uploadImage} />
  </label>
) : (
  <div className="relative h-full">
    <img
      src={patientImage}
      alt="uploaded-image"
      className="h-24 w-24"
    />

    <button
      type="button"
      className="absolute bottom-1 right-1 p-3 rounded-full bg-white text-sm cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
      onClick={() => setPatientImage(null)}
    >
      <MdDelete className="text-red-600" />
    </button>
  </div>
)}
</div>



 

  <input
              type="text"
              name="caseTitle"
              placeholder="Case Title"
              className=" shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register('caseTitle')}
            />
            <p className="text-red-500 text-xs italic">
              {errors.caseTitle?.message}
            </p>

            <input
              type="text"
              name="requesterContact"
              placeholder="Request Contact"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register('requesterContact')}
            />
            <p className="text-red-500 text-xs italic">
              {errors.requesterContact?.message}
            </p>

            <input
              type="text"
              name="patientAddress"
              placeholder="Patient Address"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register('patientAddress')}
            />
            <p className="text-red-500 text-xs italic">
              {errors.patientAddress?.message}
            </p>

            <textarea
              rows="6"
              type="text"
              name="patientDescription"
              placeholder="Patient Description"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register('patientDescription')}
            />
            <p className="text-red-500 text-xs italic">
              {errors.patientDescription?.message}
            </p>

            <input
              type="text"
              name="amountGoal"
              placeholder="Goal (Amount)"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register('amountGoal')}
            />
            <p className="text-red-500 text-xs italic">
              {errors.amountGoal?.message}
            </p>

            <input
              type="text"
              name="patientAge"
              placeholder="Patient Age"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register('patientAge')}
            />
            <p className="text-red-500 text-xs italic">
              {errors.patientAge?.message}
            </p>

            <input
              type="text"
              name="patientGender"
              placeholder="Gender"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register('patientGender')}
            />
            <p className="text-red-500 text-xs italic">
              {errors.patientGender?.message}
            </p>

            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register('patientName')}
            />
            <p className="text-red-500 text-xs italic">
              {errors.patientName?.message}
            </p>

            <input
              type="text"
              name="relation"
              placeholder="Relationship"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              {...register('relation')}
            />
            <p className="text-red-500 text-xs italic">
              {errors.relation?.message}
            </p>
              
            
            <input
             className=" h-full bg-[#a2203e] hover:cursor-pointer  w-full hover:bg-[#530319] text-white font-bold py-2 px-4 rounded transition-all my-5"
              type="submit"
              id="Submit"
            />
  </form>

</div>
    )}
   <div>

   </div>

    </div>
  )
}

export default Request;

export async function getServerSideProps(context) {
  return {
    props: {
      Session: await getSession(context),
    },
  };
}
