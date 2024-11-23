import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
update: (value: TransferData) => any;
dragStart: (event: Event) => any;
dragOver: (event: Event) => any;
dragEnd: (event: Event) => any;
}, string, PublicProps, Readonly<{}> & Readonly<{
onUpdate?: ((value: TransferData) => any) | undefined;
onDragStart?: ((event: Event) => any) | undefined;
onDragOver?: ((event: Event) => any) | undefined;
onDragEnd?: ((event: Event) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

declare function __VLS_template(): {
    slots: {
        item?(_: {
            item: KanbanItem;
        }): any;
    };
    refs: {
        kanbanRef: HTMLDivElement;
    };
    attrs: Partial<{}>;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare const App: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare interface KanbanColumn {
    status: string;
    items: KanbanItem[];
}

declare interface KanbanItem {
    id: string | number;
    [key: string]: unknown;
}

declare interface TransferData {
    sourceColumnIndex: number | undefined;
    targetColumnIndex: number | undefined;
    sourceItemIndex: number | undefined;
    targetItemIndex: number | undefined;
    dataSet: VueKanbanProps | undefined;
}

export declare const VueKanban: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare interface VueKanbanProps {
    columns: KanbanColumn[];
}

export { }
