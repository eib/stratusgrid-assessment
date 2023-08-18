import type { SearchResults } from "./search-results";
import type { ShowCreateData, ShowResponseData } from "./show-data";
import axios from 'axios';

export class ShowService {

    // TODO: include pagination/search params
    async load(): Promise<ShowResponseData[]> {
        const url = "http://localhost:8080/v1/shows"; // TODO: what to do, what to do
        const { data, status } = await axios.get<SearchResults<ShowResponseData>>(url, {
            headers: {
            Accept: 'application/json',
            },
        });
        // TODO: verify status < 400
        return data.items;
    }

    async create(input: ShowCreateData): Promise<void> {
        const url = "http://localhost:8080/v1/shows"
        const { status } = await axios.post<ShowCreateData>(url, input);
        if (status >= 400) {
            throw new Error('Unable to save');
        }
    }
}
