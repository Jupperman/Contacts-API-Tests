import { AxiosResponse } from "axios";
import { Api, ApiConfig, ExistingContactDTO } from "../../src/api/Contacts";
import { generateSdk } from "../utilities";

describe("Get list", () => {
    
    describe("When there are no contacts", () => {
        
        let mySdk: Api<ApiConfig<unknown>>;
        let contactsList: AxiosResponse<ExistingContactDTO[]>;

        beforeAll(async () => {
            mySdk = generateSdk();
            contactsList = await mySdk.contacts.contactsList();
        });

        it("Should return empty array", async () => {
            expect(contactsList.data).toHaveLength(0);
        });

        it("Should return 200 status code", async () => {
            expect(contactsList.status).toEqual(200);
        });

    });
});