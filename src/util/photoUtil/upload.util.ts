import {createWriteStream, access, mkdir} from 'fs';
import {finished} from 'stream/promises';

export const photoUploadHandler = async (file, user) => {
	const uploadPath = process.cwd() + '/src/uploads/';
	const fileService = await file;
	const stream = await fileService?.createReadStream();
	const uploadPathUserName = process.cwd() + `/src/uploads/${user?.userName}`;

	const makeDirectory = mkdir(uploadPathUserName, {recursive: true}, async (error) => {
		if (error) {
			return null;
		}
	});
	const fileUpload = file && `${uploadPath}${user?.userName}/${fileService?.filename}`;

	if (makeDirectory !== null) {
		const out = createWriteStream(fileUpload);
		stream.pipe(out);
		await finished(out);
	}

	return fileUpload;
};
