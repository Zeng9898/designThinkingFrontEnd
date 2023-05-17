import styles from '../../styles';
import { NavbarWhite} from "../../components";

const RoutinePage2 = () => {
    return (
        <div className='w-full overflow-hiddle h-screen'>
            <div className={`${styles.paddingX} flex ${styles.flexCenter}  shadow-md border-b-2 border-gray-300 border-solid`}>
                <div className={`w-full`}>
                    <NavbarWhite />
                </div>
            </div>
            
        </div>
    );
}

export default RoutinePage2