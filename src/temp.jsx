<div className='bg-primary w-full overflow-hidden h-screen'>
  <div className={`${styles.paddingX} flex ${styles.flexCenter}`}>
    <div className={`w-full`}>
      <Navbar />
    </div>
  </div>
  {/* <div className={`bg-primary ${styles.flexCenter} `}>
        <div className={`${styles.boxWidth}`}>
            <Hero />
        </div>
    </div> */}


  <div className={`${styles.paddingX} flex ${styles.flexCenter}`}>
    <div className={`w-full`}>
      <Navbar />
    </div>
  </div>
  <div className={`bg-primary ${styles.flexCenter} `}>
    <div className={`${styles.boxWidth}`}>
      <Login />
    </div>
  </div>
  {/* <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Business />
          <Billing />
          <CardDeal />
          <Testimonials />
          <Clients />
          <CTA />
          <Footer />
        </div>
      </div> */}
</div>

// ${routine.stackId === '待審核' ? "border-myPink1" : "border-borderBlue"}
// return (

//   <Droppable droppableId={id}>
//     {(provided, snapshot) => (
//       <div ref={provided.innerRef}
//         {...provided.droppableProps}
//         style={{ background: snapshot.isDraggingOver ? '#FFED7D' : '' }}
//         className={`w-[282px] h-[calc(100vh-350px)] rounded-sm overflow-y-scroll  bg-white mr-4  `}>
//         <header className={`text-[16px] font-semibold text-left p-3 sticky top-0 bg-white`}>{title}</header>
//         <ul className={`pt-2 h-full rounded-md`}>
//           {routines.map((routine, index) => (
//             <Routine key={routine.id} routine={routine} index={index} />
//           ))}
          
//         </ul>
//         {provided.placeholder}
//       </div>

//     )}
//   </Droppable>
// )

//   < div className = {`w-[282px] h-[calc(100vh-350px)] rounded-sm overflow-y-scroll  bg-white mr-4  `}>
//     <header className={`text-[16px] font-semibold text-left p-3 sticky top-0 bg-white`}>{title}</header>


// </div >
//   <ul>

//   </ul>