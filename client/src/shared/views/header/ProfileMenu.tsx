import { Component, createSignal } from 'solid-js';
import { Tooltip } from '@solsy/ui';
import { Menu, MenuOption } from '@solsy/ui';

export const ProfileMenu: Component = () => {

    const [menuTrigger, setTrigger] = createSignal<HTMLElement>();
    const [show, setShow] = createSignal(false);

    const toggleMenu = () => setShow(!show());

    return (
        <>
            <Tooltip message="Профиль" placement="left">
                <button class="btn btn-sm btn-circle btn-ghost" ref={setTrigger} onClick={toggleMenu}>
                    <i class="fa-solid fa-user"/>
                </button>
            </Tooltip>

            <Menu
                isShow={show()}
                reference={menuTrigger()}
                onBackdropClick={toggleMenu}
            >
                <MenuOption>
                    <i class="fa-solid fa-right-from-bracket"/>
                    Logout
                </MenuOption>
            </Menu>
        </>
    );
};
