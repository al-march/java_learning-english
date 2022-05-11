import { WordCreateDto, WordDto } from '@models/words';
import httpClient from '@services/http/httpClient';
import { Page, PageParams } from '@api/Api.type';

const url = 'api/v1/word';

export const createWord = (dto: WordCreateDto) => {
    return httpClient.post<WordDto>(url, dto);
};

export const updateWord = (dto: WordCreateDto, wordId: string) => {
    return httpClient.put<WordDto>(`${url}/${wordId}`, dto);
};

export interface GetWordsParams extends PageParams {
    name?: string;
    range?: Date | null;
}

export const getWords = (params: GetWordsParams = {page: 0, size: 10}) => {
    const {page = 0, size = 10, name = '', range = null} = params;
    const query = new URLSearchParams();

    query.set('page', page.toString());
    query.set('size', size.toString());
    if (name) {
        query.set('name', name);
    }
    if (range) {
        query.set('from', String(+range));
        query.set('to', String(+new Date()));
    }

    return httpClient.get<Page<WordDto>>(`${url}/all`, {
        params: query
    });
};
