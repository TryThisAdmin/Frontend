import { writable } from "svelte/store";
import type { Idea, IdeaPreview, Comment, User, Account } from "./interfaces";

/**
 * Stores the latest error message
 */
export const ERROR_MESSAGE_STORE = writable<string>("");

/**
 * Stores the current token
 */
export const TOKEN_STORE = writable<string>("");

/**
 * Stores the current UID
 */
export const UID_STORE = writable<string>("");

/**
 * Stores the current username
 */
export const USERNAME_STORE = writable<string>("");

/**
 * Stores the current role of the user
 */
export const ROLE_STORE = writable<string>("");

/**
 * Stores all used tags
 */
export const TAG_STORE = writable<string[]>([]);

/**
 * Stores the currently loaded idea
 */
export const CURRENT_IDEA_STORE = writable<Idea>(null);

/**
 * Stores a list of top ideas
 */
export const TOP_IDEAS_STORE = writable<IdeaPreview[]>([]);

/**
 * Stores a list of recent ideas
 */
export const RECENT_IDEAS_STORE = writable<IdeaPreview[]>([]);

/**
 * Stores a list of search results
 */
export const SEARCH_RESULTS_STORE = writable<IdeaPreview[]>([]);

/**
 * Stores a list of an users ideas
 */
export const USER_IDEAS_STORE = writable<IdeaPreview[]>([]);

/**
 * Stores a list of own ideas
 */
export const OWN_IDEAS_STORE = writable<IdeaPreview[]>([]);

/**
 * Stores a list of liked ideas
 */
export const LIKED_IDEAS_STORE = writable<IdeaPreview[]>([]);

/**
 * Stores a list of saved ideas
 */
export const SAVED_IDEAS_STORE = writable<IdeaPreview[]>([]);

/**
 * Stores a list of recent ideas by followed users
 */
export const FOLLOWED_IDEAS_STORE = writable<IdeaPreview[]>([]);

/**
 * Stores comments for the currently loaded idea
 */
export const COMMENTS_STORE = writable<Comment[]>([]);

/**
 * Stores information about an user
 */
export const USER_STORE = writable<User>(null);

/**
 * Stores account info for current user
 */
export const ACCOUNT_STORE = writable<Account>(null);
