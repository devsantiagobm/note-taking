import "./modal.molecule.scss"
import { Icon } from "@/system-design/atoms";
import { Fragment } from "react";
import { IconType } from "react-icons";
import { AnimatePresence, motion } from "motion/react";


interface Props {
    isVisible: boolean;
    setIsVisible: (param: string | null) => void;
    title: string;
    description: string;
    icon: IconType;
    buttons?: React.ReactElement[];
}


export function Modal({ isVisible, setIsVisible, title, description, icon, buttons }: Props) {

    return (
        <Fragment>

            <AnimatePresence>
                {
                    isVisible && (
                        <div className="modal">
                            <motion.div
                                className="modal__overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setIsVisible(null)}
                            />
                            <motion.div
                                className="modal__content"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                <div className="modal__column">
                                    <Icon icon={icon} className="modal__icon" size={20} />
                                </div>

                                <div className="modal__column">
                                    <h4 className="modal__title">{title}</h4>
                                    <p className="modal__description">{description}</p>

                                    <div className="modal__buttons">
                                        <div className="modal__buttons">
                                            {buttons && buttons.map((btn, i) => <Fragment key={i}>{btn}</Fragment>)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence>
        </Fragment >
    )
}


