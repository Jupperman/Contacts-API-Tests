import * as sdk from "../src/api/Contacts";
import { generateSdk } from "./utilities";
import {v4 as stringGenerator} from "uuid";

describe("Get by ID", () => {
    let mySdk: sdk.Api<sdk.ApiConfig>;
    let myString: string;
    let newContact: sdk.ExistingContactDTO;

    beforeAll(() => {
        mySdk = generateSdk();
    })

    beforeEach(async () => {
        myString = stringGenerator();
        var axiosPromise = mySdk.contacts.contactsCreate({name: {first: myString, last: "test"} });
        var axiosResult = await axiosPromise;
        newContact = axiosResult.data;

    });

    afterEach(async () => {
        await mySdk.contacts.contactsDelete(newContact.id!)
    });

    it("should find contact", async () => {
        var foundContact = (await mySdk.contacts.contactsDetail(newContact.id!)).data;
        expect(foundContact.name.first).toEqual(myString);
    });
});
