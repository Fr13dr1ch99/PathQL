import {PathQLServerEntry} from "pathql/src/PathQL/Server/PathQLServerEntry.class.js"
import {Groups} from "pathql/tests/Entrys/Groups.pathql.js";

export class User extends PathQLServerEntry {
	static fields = {
		"name": {
			"type": "String"
		}
	}

	constructor(options = {}) {
		super(options);
		this.objects = {
			"Groups": Groups
		};
		return (async function () {
			await this.parseFromRaw(options);
			return this;
		}.bind(this)());
	}

	generatePassword() {
		this.password = "";
		this.generatedPassword = window.crypto.subtle.generateKey(
			{
				name: "RSA-OAEP",
				modulusLength: 4096,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash: "SHA-256"
			},
			true,
			["encrypt", "decrypt"]
		);

	}

	checkPassword() {

	}
}
