import { Component, createSignal } from 'solid-js';
import { Menu } from '@components/menu';
import { FormField } from '@components/form/group/FormField';
import { Validators } from '@root/src/lib/form/validators/validators';
import { FormError } from '@components/form/group/FormError';
import { createForm } from '@root/src/lib/form/createForm';

export type WordGroupAddControls = {
    name: string;
    definition: string;
}

type Props = {
    onSubmit?: (controls: WordGroupAddControls) => void;
}

export const WordGroupAdd: Component<Props> = (props) => {
    const [show, setShow] = createSignal(false);
    const [reference, setReference] = createSignal<HTMLElement>();
    const {register, submit, errors, reset, refs} = createForm<WordGroupAddControls>();

    const onSubmit = (controls: WordGroupAddControls) => {
        if (props.onSubmit) {
            props.onSubmit(controls);
        }
    };

    const open = () => {
        setShow(true);
        const input = refs.name;
        if (input) {
            input.focus();
        }
    };
    const close = () => {
        reset();
        setShow(false);
    };

    return (
        <>
            <button
                class="btn btn-primary btn-ghost gap-2 w-full"
                onClick={open}
                ref={setReference}
            >
                <i class="fa-solid fa-plus"/>
                <span>Добавить слово</span>
            </button>

            <Menu
                isShow={show()}
                onBackdropClick={close}
                reference={reference()}
                autoWidth={true}
            >
                <form className="flex flex-col p-4" onSubmit={submit(onSubmit)}>
                    <FormField>
                        <input
                            type="text"
                            class="input input-sm"
                            placeholder="Name..."
                            autocomplete="off"
                            classList={{'input-error': !!errors.name}}
                            {...register('name', {
                                validators: [
                                    Validators.required()
                                ]
                            })}
                        />
                        <FormError show={!!errors.name}>Required field</FormError>
                    </FormField>

                    <FormField>
                        <input
                            type="text"
                            class="input input-sm"
                            placeholder="Definition..."
                            autocomplete="off"
                            classList={{'input-error': !!errors.definition}}
                            {...register('definition', {
                                validators: [
                                    Validators.required()
                                ]
                            })}
                        />
                        <FormError show={!!errors.definition}>Required field</FormError>
                    </FormField>

                    <div class="modal-actions flex items-center justify-end pt-2 gap-2">
                        <button class="btn btn-ghost btn-sm text-error" type="button" onClick={close}>close</button>
                        <button class="btn btn-primary btn-sm" type="submit">Create</button>
                    </div>
                </form>
            </Menu>
        </>
    );
};