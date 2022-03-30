export interface RAW_IdeaPreview {
	id: string;
	title: string;
	preview: string;
	authorID: string;
	author: string;
	created: string;
	updated: string;
	likes: string;
	tags: string;
}
export interface RAW_Idea {
	id: string;
	title: string;
	content: string;
	authorID: string;
	author: string;
	created: string;
	updated: string;
	likes: string;
	tags: string;
	liked: string;
	saved: string;
}

export interface RAW_Comment {
	id: string;
	content: string;
	idea: string;
	authorID: string;
	author: string;
	created: string;
	updated: string;
	likes: string;
	liked: string;
}

export interface RAW_User {
	id: string;
	name: string;
	github: string;
	role: string;
	following: string;
	followers: string;
	commentLikes: string;
	ideaLikes: string;
	ideas: string;
	comments: string;
}

export interface RAW_Account {
	id: string;
	name: string;
	email: string;
	github: string;
	role: string;
	followers: string;
	commentLikes: string;
	ideaLikes: string;
	ideas: string;
	comments: string;
}

export interface JWTPayload {
	uid: string;
	role: string;
	exp: string;
}
