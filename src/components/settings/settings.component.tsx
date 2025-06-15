'use client';

import './settings.component.scss';
import { Icon } from '@/system-design/atoms';
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { Drawer } from 'vaul';
import { fontOptions, themeOptions } from './settings.data';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export function Settings() {
    const dispatch = useDispatch()
    const settings = useSelector((store: RootState) => store.settings)

    return (
        <Drawer.Root>

            <Drawer.Trigger className="settings__trigger">
                <Icon icon={SettingsIcon} size={18} />
            </Drawer.Trigger>

            <Drawer.Portal>
                <Drawer.Overlay className="settings__overlay" />
                <Drawer.Content className="settings__content">

                    <div className="settings__panel">
                        <div aria-hidden className="settings__handle" />
                        <div className="settings__body">
                            <Drawer.Title className="settings__title">Color Theme</Drawer.Title>
                            <Drawer.Description className="settings__description">Choose your color theme:</Drawer.Description>

                            <div className='settings__options-list'>
                                {
                                    themeOptions.map(({ title, icon, description, action, value }) => (
                                        <button className={`settings__option ${value === settings.theme && "settings__option--active"}`} key={title} onClick={() => dispatch(action())} >
                                            <div className="settings__option-content">
                                                <Icon icon={icon} size={16} className='settings__option-icon'></Icon>

                                                <div className="settings__option-texts">
                                                    <span className="settings__option-title">{title}</span>
                                                    <p className="settings__option-description">{description}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="settings__body settings__body--bottom">
                            <Drawer.Title className="settings__title">Font Theme</Drawer.Title>
                            <Drawer.Description className="settings__description">Choose your font theme:</Drawer.Description>

                            <div className='settings__options-list'>

                                {
                                    fontOptions.map(({ title, description, action, value }) => (
                                        <button className={`settings__option ${value === settings.font && "settings__option--active"}`} key={title} onClick={() => dispatch(action())} >
                                            <div className="settings__option-content">
                                                <span className={`settings__option-icon settings__option-icon--${value}`}>Aa</span>

                                                <div className="settings__option-texts">
                                                    <span className="settings__option-title">{title}</span>
                                                    <p className="settings__option-description">{description}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                }

                            </div>
                        </div>
                    </div>

                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
