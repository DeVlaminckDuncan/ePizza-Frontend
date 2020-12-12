// TODO: Look for type annotation IDB Transaction callbacks

const DB_NAME: string = 'pizzadb',
	DB_VERSION: number = 1,
	idName: string = 'idbId';

const getDb = async (): Promise<IDBDatabase> => {
	let DB: IDBDatabase;

	return new Promise((resolve, reject) => {
		if (DB) {
			return resolve(DB);
		}
		const request: IDBOpenDBRequest = window.indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = (e) => {
			console.log('Error opening db', e);
			reject('Error');
		};

		request.onsuccess = (e: any) => {
			if (e.target) {
				DB = e.target.result;
				resolve(DB);
			}
		};

		request.onupgradeneeded = (e: any) => {
			console.log('onupgradeneeded');
			if (e.target) {
				const db = e.target.result;
				db.createObjectStore('pizzas', {
					autoIncrement: true,
					keyPath: idName,
				});
			}
		};
	});
};

export const getItems = async (entity: string): Promise<any> => {
	const db = await getDb();

	return new Promise((resolve) => {
		const trans: IDBTransaction = db.transaction([entity], 'readonly');
		const store: IDBObjectStore = trans.objectStore(entity);

		const items: Array<any> = [];

		trans.oncomplete = () => {
			resolve(items);
		};

		store.openCursor().onerror = (e: any): void => {
			console.error('An error occured', e);
		};

		store.openCursor().onsuccess = (e: any): void => {
			const cursor = e.target.result;
			if (cursor) {
				items.push(cursor.value);
				cursor.continue();
			}
		};
	});
};

export const getItemById = async (entity: string, id: number | string): Promise<any> => {
	const db = await getDb();

	return new Promise((resolve) => {
		const trans: IDBTransaction = db.transaction([entity], 'readonly');
		const store: IDBObjectStore = trans.objectStore(entity);

		let item: any = {};

		trans.oncomplete = () => {
			resolve(item);
		};

		store.openCursor().onerror = (e: any): void => {
			console.error('An error occured', e);
		};

		store.openCursor().onsuccess = (e: any): void => {
			const cursor = e.target.result;
			if (cursor) {
				if (cursor.key == id) {
					item = cursor.value;
				} else {
					cursor.continue();
				}
			}
		};
	});
};

export const saveItem = async (entity: string, item: any) => {
	const db = await getDb();

	return new Promise((resolve) => {
		const trans: IDBTransaction = db.transaction(entity, 'readwrite');
		trans.oncomplete = (e: any) => {
			resolve(e);
		};

		const store = trans.objectStore(entity);
		store.add(item);
	});
};

export const deleteItem = async (entity: string, item: any) => {
	const db = await getDb();

	return new Promise((resolve) => {
		const trans: IDBTransaction = db.transaction(entity, 'readwrite');
		trans.oncomplete = () => {
			resolve();
		};

		const store: IDBObjectStore = trans.objectStore(entity);
		store.delete(item[idName]);
	});
};

export const editItem = async (entity: string, item: any) => {
	const db = await getDb();

	return new Promise((resolve) => {
		const trans: IDBTransaction = db.transaction(entity, 'readwrite');
		trans.oncomplete = (e: any) => {
			resolve(e);
		};

		const store = trans.objectStore(entity);
		store.openCursor().onerror = (e: any): void => {
			console.error('An error occured', e);
		};

		store.openCursor().onsuccess = (e: any): void => {
			const cursor = e.target.result;

			if (cursor) {
				if (cursor.key == item[idName]) {
					cursor.update(item);
				} else {
					cursor.continue();
				}
			}
		};
	});
};
