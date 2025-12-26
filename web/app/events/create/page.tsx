import CreateEventForm from "@/components/Forms/CreateEventForm"

function page() {

  return (
    <div className='w-full bg-[##E9E9E9] h-full min-h-screen bgred flex flex-col justify-start px-5 items-center pt-12'>
      <div className=" flex justify-start items-start max-w-3xl px-2 w-full flex-col gap-3 ">
        <h1 className=" font-bold text-4xl text-[##222] text-left w-full ">Pubblica il tuo Evento</h1>
        <p className=" text-left">
          Compila il form per pubblicare il tuo evento.</p>
      </div>
      <CreateEventForm />
    </div>
  )
}

export default page