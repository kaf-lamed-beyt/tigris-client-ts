import { getDecoratorMetaStorage } from "../globals";

/**
 * TigrisSearchIndex decorator is used to mark a class as a schema/data model for Search Index.
 *
 * @param name - Name of Index
 */
export function TigrisSearchIndex(name: string): ClassDecorator {
	return function (target) {
		getDecoratorMetaStorage().indexes.push({
			indexName: name,
			target: target,
		});
	};
}
