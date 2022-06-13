import {
	LogicalFilter,
	LogicalOperator,
	SelectorFilter,
	SelectorFilterOperator,
	TigrisCollectionType,
} from "../types";
import {Utility} from '../utility';

describe('success tests', () => {

	it('basicSelectorFilterTest', () => {
		const filter1: SelectorFilter<IUser> = {
			op: SelectorFilterOperator.EQ,
			fields: {
				name: 'Alice'
			}
		};
		expect(Utility._selectorFilterToString(filter1)).toBe('{"name":"Alice"}');

		const filter2: SelectorFilter<IUser> = {
			op: SelectorFilterOperator.EQ,
			fields: {
				id: BigInt(123)
			}
		};
		expect(Utility._selectorFilterToString(filter2)).toBe('{"id":123}');

		const filter3: SelectorFilter<IUser1> = {
			op: SelectorFilterOperator.EQ,
			fields: {
				isActive: true
			}
		};
		expect(Utility._selectorFilterToString(filter3)).toBe('{"isActive":true}');
	});

	it('selectorFilter_1', () => {
		const tigrisFilter: SelectorFilter<Student> = {
			op: SelectorFilterOperator.EQ,
			fields: {
				id: BigInt(1),
				name: 'alice',
			}
		};
		expect(Utility._selectorFilterToString(tigrisFilter)).toBe('{"id":1,"name":"alice"}');
	});

	it('selectorFilter_2', () => {
		const tigrisFilter: SelectorFilter<Student> = {
			op: SelectorFilterOperator.EQ,
			fields: {
				id: BigInt(1),
				name: 'alice',
				balance: 12.34
			}
		};
		expect(Utility._selectorFilterToString(tigrisFilter)).toBe('{"id":1,"name":"alice","balance":12.34}');
	});

	it('selectorFilter_3', () => {
		const tigrisFilter: SelectorFilter<Student> = {
			op: SelectorFilterOperator.EQ,
			fields: {
				id: BigInt(1),
				name: 'alice',
				balance: 12.34,
				address: {
					city: 'San Francisco'
				}
			}
		};
		expect(Utility._selectorFilterToString(tigrisFilter)).toBe('{"id":1,"name":"alice","balance":12.34,"address.city":"San Francisco"}');
	});

	it('logicalFilterTest1', () => {
		const logicalFilter: LogicalFilter<IUser> = {
			op: LogicalOperator.OR,
			selectorFilters: [
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						name: 'alice'
					}
				},
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						name: 'emma'
					}
				}
			]
		};
		expect(Utility._logicalFilterToString(logicalFilter)).toBe('{"$or":[{"name":"alice"},{"name":"emma"}]}');
	});

	it('logicalFilterTest2', () => {
		const logicalFilter: LogicalFilter<IUser2> = {
			op: LogicalOperator.AND,
			selectorFilters: [
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						name: 'alice'
					}
				},
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						rank: 1
					}
				}
			]
		};
		expect(Utility._logicalFilterToString(logicalFilter)).toBe('{"$and":[{"name":"alice"},{"rank":1}]}');
	});

	it('nestedLogicalFilter1', () => {
		const logicalFilter1: LogicalFilter<IUser2> = {
			op: LogicalOperator.AND,
			selectorFilters: [
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						name: 'alice',
					}
				},
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						rank: 1
					}
				}
			]
		};
		const logicalFilter2: LogicalFilter<IUser2> = {
			op: LogicalOperator.AND,
			selectorFilters: [
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						name: 'emma',
					}
				},
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						rank: 1
					}
				}
			]
		};
		const nestedLogicalFilter: LogicalFilter<IUser2> = {
			op: LogicalOperator.OR,
			logicalFilters: [logicalFilter1, logicalFilter2]
		};
		expect(Utility._logicalFilterToString(nestedLogicalFilter)).toBe('{"$or":[{"$and":[{"name":"alice"},{"rank":1}]},{"$and":[{"name":"emma"},{"rank":1}]}]}');
	});

	it('nestedLogicalFilter2', () => {
		const logicalFilter1: LogicalFilter<IUser2> = {
			op: LogicalOperator.OR,
			selectorFilters: [
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						name: 'alice',
					}
				},
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						rank: 1
					}
				}
			]
		};
		const logicalFilter2: LogicalFilter<IUser2> = {
			op: LogicalOperator.OR,
			selectorFilters: [
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						name: 'emma',
					}
				},
				{
					op: SelectorFilterOperator.EQ,
					fields: {
						rank: 1
					}
				}
			]
		};
		const nestedLogicalFilter: LogicalFilter<IUser2> = {
			op: LogicalOperator.AND,
			logicalFilters: [logicalFilter1, logicalFilter2]
		};
		expect(Utility._logicalFilterToString(nestedLogicalFilter)).toBe('{"$and":[{"$or":[{"name":"alice"},{"rank":1}]},{"$or":[{"name":"emma"},{"rank":1}]}]}');
	});
});

export interface IUser extends TigrisCollectionType {
	id: BigInt;
	name: string;
	balance: number;
}

export interface IUser1 extends TigrisCollectionType {
	id: BigInt;
	name: string;
	balance: number;
	isActive: boolean;
}

export interface IUser2 extends TigrisCollectionType {
	id: BigInt;
	name: string;
	rank: number;
}

export interface Student extends TigrisCollectionType {
	id: BigInt;
	name: string;
	balance: number;
	address: Address;
}

export interface Address extends TigrisCollectionType {
	street: string;
	unit: string;
	city: string;
	state: string;
	zipcode: number;
}