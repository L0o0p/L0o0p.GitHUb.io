import { Player } from '@lottiefiles/react-lottie-player';
import styles from './index.module.scss'
export const Float = () => {
    return (
        <div className={styles.float}>
            <Player
                src={'https://assets1.lottiefiles.com/packages/lf20_myejiggj.json'}
                className="player"
                loop
                autoplay
            />
        </div>
    )
}