export interface IdeaPreview {
	/**
	 * Identifier of the idea
	 */
	id: string;

	/**
	 * Title of the idea
	 */
	title: string;

	/**
	 * UID of the ideas author
	 */
	authorID: string;

	/**
	 * Username of the ideas author
	 */
	author: string;

	/**
	 * Date of creation
	 */
	created: Date;

	/**
	 * Date of update
	 */
	updated: Date;

	/**
	 * Number of likes
	 */
	likes: number;

	/**
	 * Tags as comma separated values "tag1,tag2,tag3"
	 */
	tags: string[];
}

export interface Idea {
	/**
	 * Identifier of the idea
	 */
	id: string;

	/**
	 * Title of the idea
	 */
	title: string;

	/**
	 * Full content of the idea
	 */
	content: string;

	/**
	 * UID of the ideas author
	 */
	authorID: string;

	/**
	 * Username of the ideas author
	 */
	author: string;

	/**
	 * Date of creation
	 */
	created: Date;

	/**
	 * Date of update
	 */
	updated: Date;

	/**
	 * Number of likes
	 */
	likes: number;

	/**
	 * Tags as comma separated values "tag1,tag2,tag3"
	 */
	tags: string[];

	/**
	 * Non-empty string if current user has liked this idea
	 */
	liked: boolean;

	/**
	 * Non-empty string if current user has saved this idea
	 */
	saved: boolean;
}

export interface Comment {
	/**
	 * Identifier of the comment
	 */
	id: string;

	/**
	 * Conent of the content
	 */
	content: string;

	/**
	 * ID of the parent idea
	 */
	idea: string;

	/**
	 * UID of the comments author
	 */
	authorID: string;

	/**
	 * Username of the comments author
	 */
	author: string;

	/**
	 * Date of creation
	 */
	created: Date;

	/**
	 * Date of update
	 */
	updated: Date;

	/**
	 * Number of likes
	 */
	likes: number;

	/**
	 * Non-empty string of user has liked this comment
	 */
	liked: boolean;
}

export interface User {
	/**
	 * Identifier of the user
	 */
	id: string;

	/**
	 * Username of the user
	 */
	name: string;

	/**
	 * GitHub username of user
	 */
	github: string;

	/**
	 * Role of the user
	 */
	role: string;

	/**
	 * if the current user is following
	 */
	following: boolean;

	/**
	 * how many followers
	 */
	followers: number;

	/**
	 * how many likes for ideas
	 */
	ideaLikes: number;

	/**
	 * how many likes for comments
	 */
	commentLikes: number;

	/**
	 * how many posted ideas
	 */
	ideas: number;

	/**
	 * How many posted comments
	 */
	comments: number;
}

export interface Account {
	/**
	 * Identifier of the user
	 */
	id: string;

	/**
	 * Username of the user
	 */
	name: string;

	/**
	 * Email of the user
	 */
	email: string;

	/**
	 * GitHub username if user
	 */
	github: string;

	/**
	 * Role of the user
	 */
	role: string;

	/**
	 * how many followers
	 */
	followers: number;

	/**
	 * how many likes for ideas
	 */
	ideaLikes: number;

	/**
	 * how many likes for comments
	 */
	commentLikes: number;

	/**
	 * how many posted ideas
	 */
	ideas: number;

	/**
	 * How many posted comments
	 */
	comments: number;
}
