import NormalRoutine from "./NormalRoutine"

const NormalColumn = ({ title, routines, id }) => {
    return (
        <div
            className={`w-[282px] h-[calc(100vh-350px)] rounded-sm  bg-white mr-4 overflow-y-scroll`}>
            <header className={`text-[16px] font-semibold text-left p-3 sticky top-0 bg-white`}>{title}</header>
            <ul className={`pt-2  rounded-md `}>
                {routines.map((routine, index) => (
                    <NormalRoutine key={routine.id} routine={routine} index={index} />
                ))}
            </ul>
        </div>
    )
}

export default NormalColumn