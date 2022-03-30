import type { RAW_Account, RAW_Comment, RAW_Idea, RAW_IdeaPreview, RAW_User } from "./interfaces";
import type { Account, Comment, Idea, IdeaPreview, User } from "../interfaces";

export function mapIdeaPreview(e: RAW_IdeaPreview): IdeaPreview {
	return {
		id: e.id,
		title: e.title,
		authorID: e.authorID,
		author: e.author,
		created: new Date(e.created),
		updated: new Date(e.updated),
		likes: Number(e.likes),
		tags: e.tags.split(",").filter((e) => !!e)
	};
}

export function mapIdea(e: RAW_Idea): Idea {
	return {
		id: e.id,
		title: e.title,
		content: e.content,
		authorID: e.authorID,
		author: e.author,
		created: new Date(e.created),
		updated: new Date(e.updated),
		likes: Number(e.likes),
		tags: e.tags.split(",").filter((e) => !!e),
		liked: !!e.liked,
		saved: !!e.saved
	};
}

export function mapComment(e: RAW_Comment): Comment {
	return {
		id: e.id,
		content: e.content,
		idea: e.idea,
		authorID: e.authorID,
		author: e.author,
		created: new Date(e.created),
		updated: new Date(e.updated),
		likes: Number(e.likes),
		liked: !!e.liked
	};
}

export function mapUser(e: RAW_User): User {
	return {
		id: e.id,
		name: e.name,
		github: e.github,
		role: e.role,
		following: !!e.following,
		followers: Number(e.followers),
		commentLikes: Number(e.commentLikes),
		ideaLikes: Number(e.ideaLikes),
		comments: Number(e.comments),
		ideas: Number(e.ideas)
	};
}

export function mapAccount(e: RAW_Account): Account {
	return {
		id: e.id,
		name: e.name,
		email: e.email,
		github: e.github,
		role: e.role,
		followers: Number(e.followers),
		commentLikes: Number(e.commentLikes),
		ideaLikes: Number(e.ideaLikes),
		comments: Number(e.comments),
		ideas: Number(e.ideas)
	};
}
