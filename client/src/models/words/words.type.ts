/**
 * @See from Java model: rest.word.model.Word
 */
export interface WordDto {
    id: string;
    groupId: string;
    name: string;
    definition: string;
    done: boolean;
    createAt: string;
    updateAt: string;
}

/**
 * @See from Java model: rest.group.model.WordGroup
 */
export interface WordGroupDto {
    id: string;
    name: string;
    createAt: string;
    updateAt: string;
    done: boolean;
    words: WordDto[];
}