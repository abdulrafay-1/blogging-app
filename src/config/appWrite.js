import { Client, ID, Storage } from 'appwrite';

const client = new Client()
    .setProject('67347e45002a1384ba7e')
    .setEndpoint('https://cloud.appwrite.io/v1')

const storage = new Storage(client);

const uploadFile = (file) => {
    const promise = storage.createFile(
        '67347e95000d2f8b5294',
        ID.unique(),
        file
    );
    return promise;
}

export { uploadFile }

