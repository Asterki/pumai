import { z } from "zod";
import { zObjectId, zObjectIdWithMessage, turnIntoUndefinedIfEmpty } from ".";

const createAccountSchema = z.object({
	email: z.email("invalid-email"),
	name: z.string().min(1, "name-too-short").max(100, "name-too-long"),
	password: z
		.string()
		.min(8, "password-too-short")
		.max(256, "password-too-long"),
	roleId: zObjectIdWithMessage("role-required"),
	notify: z.boolean().optional(),
	locale: z.enum(["en", "de", "fr", "es"], "invalid-locale").optional(),
});

const deleteAccountSchema = z.object({
	accountId: zObjectId,
});

const updateAccountSchema = z.object({
	accountId: zObjectId,
	name: z
		.string()
		.min(2, "name-too-short")
		.max(100, "name-too-long")
		.optional(),
	email: z.email("invalid-email").optional(),
	password: turnIntoUndefinedIfEmpty(
		z.union(
			[
				z.string().min(8, "password-too-short").max(100, "password-too-long"),
				z.undefined("password-optional"),
			],
			{ message: "password-optional" },
		),
	),
	roleId: zObjectId.optional(),
	notify: z.boolean().optional(),
	disableTwoFactor: z.boolean().optional(),
});

const getAccountsSchema = z.object({
	accountIds: z.array(zObjectId),
	fields: z
		.array(
			z.enum(
				["_id", "data", "email", "profile", "preferences", "metadata"],
				"invalid-field",
			),
		)
		.optional(),
});

const listAccountsSchema = z.object({
	count: z.number().min(0, "count-too-low"),
	page: z.number().nonnegative("page-too-low"),
	filters: z
		.object({
			role: zObjectId.optional(),
		})
		.optional(),
	search: z
		.object({
			query: z.string().max(100, "query-too-long"),
			searchIn: z.array(
				z.enum(["profile.name", "email.value"], "invalid-search-field"),
			),
		})
		.optional(),
	includeDeleted: z.boolean().optional(),
	fields: z
		.array(
			z.enum(
				["_id", "data", "email", "profile", "preferences", "metadata"],
				"invalid-field",
			),
		)
		.optional(),
	populate: z.array(z.literal("data.role"), "invalid-populate-path").optional(),
});

export {
	createAccountSchema,
	deleteAccountSchema,
	getAccountsSchema,
	updateAccountSchema,
	listAccountsSchema,
};
