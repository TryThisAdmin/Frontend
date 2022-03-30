import { appendCommentsCommand } from "./append/appendComments";
import { appendLikedIdeasCommand } from "./append/appendLikedIdeas";
import { appendOwnIdeasCommand } from "./append/appendOwnIdeas";
import { appendRecentIdeasCommand } from "./append/appendRecentIdeas";
import { appendSavedIdeasCommand } from "./append/appendSavedIdeas";
import { appendSearchResultsCommand } from "./append/appendSearchResults";
import { appendTopIdeasCommand } from "./append/appendTopIdeas";
import { appendUserIdeasCommand } from "./append/appendUserIdeas";
import { clearAccountCommand } from "./clear/clearAccount";
import { clearCommentsCommand } from "./clear/clearComments";
import { clearErrorsCommand } from "./clear/clearErrors";
import { clearIdeaCommand } from "./clear/clearIdea";
import { clearLikeIdeasCommand } from "./clear/clearLikedIdeas";
import { clearOwnIdeasCommand } from "./clear/clearOwnIdeas";
import { clearRecentIdeasCommand } from "./clear/clearRecentIdeas";
import { clearSavedIdeasCommand } from "./clear/clearSavedIdeas";
import { clearSearchResultsCommand } from "./clear/clearSearchResults";
import { clearTopIdeasCommand } from "./clear/clearTopIdeas";
import { clearUserCommand } from "./clear/clearUser";
import { clearUserIdeasCommand } from "./clear/clearUserIdeas";
import { createCommentCommand } from "./create/createComment";
import { createIdeaCommand } from "./create/createIdea";
import { deleteCommentCommand } from "./delete/deleteComment";
import { deleteIdeaCommand } from "./delete/deleteIdea";
import { editCommentCommand } from "./edit/editComment";
import { editIdeaCommand } from "./edit/editIdea";
import { likeCommentCommand } from "./like/likeComment";
import { likeIdeaCommand } from "./like/likeIdea";
import { loadAccountCommand } from "./load/loadAccount";
import { loadCommentsCommand } from "./load/loadComments";
import { loadIdeaCommand } from "./load/loadIdea";
import { loadLikedIdeasCommand } from "./load/loadLikedIdeas";
import { loadOwnIdeasCommand } from "./load/loadOwnIdeas";
import { loadRecentIdeasCommand } from "./load/loadRecentIdeas";
import { loadSavedIdeasCommand } from "./load/loadSavedIdeas";
import { loadSearchResultsCommand } from "./load/loadSearchResults";
import { loadTopIdeasCommand } from "./load/loadTopIdeas";
import { loadUserCommand } from "./load/loadUser";
import { loadUserIdeasCommand } from "./load/loadUserIdeas";
import { loginCommand } from "./login/login";
import { logoutCommand } from "./login/logout";
import { saveIdeaCommand } from "./save/saveIdea";
import { unlikeCommentCommand } from "./like/unlikeComment";
import { unlikeIdeaCommand } from "./like/unlikeIdea";
import { unsaveIdeaCommand } from "./save/unsaveIdea";
import { loadTagsCommand } from "./load/loadTags";
import { clearTagsCommand } from "./clear/clearTags";
import { editUsernameCommand } from "./edit/editUsername";
import { editPasswordCommand } from "./edit/editPassword";
import { editEmailCommand } from "./edit/editEmail";
import { registerCommand } from "./login/register";
import { followUserCommand } from "./follow/followUser";
import { unfollowUserCommand } from "./follow/unfollowUser";
import { deleteUserCommand } from "./delete/deleteUser";
import { recoverCommand } from "./login/recover";
import { loadFollowedIdeasCommand } from "./load/loadFollowedIdeas";
import { appendFollowedIdeasCommand } from "./append/appendFollowedIdeas";
import { clearFollowedIdeasCommand } from "./clear/clearFollowedIdeas";
import { editGithubCommand } from "./edit/editGithub";
import { elevateUserPermissionCommand } from "./permission/elevateUserPermission";
import { demoteUserPermissionCommand } from "./permission/demoteUserPermission";

/**
 * Collection of functions for backend interaction
 */
export const Commands = {
	clearErrors: clearErrorsCommand,

	loadTags: loadTagsCommand,
	clearTags: clearTagsCommand,

	register: registerCommand,
	deleteUser: deleteUserCommand,
	login: loginCommand,
	logout: logoutCommand,
	recoverAccount: recoverCommand,

	editUsername: editUsernameCommand,
	editEmail: editEmailCommand,
	editGithub: editGithubCommand,
	editPassword: editPasswordCommand,

	elevateUserPermission: elevateUserPermissionCommand,
	demoteUserPermission: demoteUserPermissionCommand,

	loadAccount: loadAccountCommand,
	clearAccount: clearAccountCommand,

	loadUser: loadUserCommand,
	clearUser: clearUserCommand,

	followUser: followUserCommand,
	unfollowUser: unfollowUserCommand,

	loadFollowedIdeas: loadFollowedIdeasCommand,
	appendFollowedIdeas: appendFollowedIdeasCommand,
	clearFollowedIdeas: clearFollowedIdeasCommand,

	loadTopIdeas: loadTopIdeasCommand,
	appendTopIdeas: appendTopIdeasCommand,
	clearTopIdeas: clearTopIdeasCommand,

	loadRecentIdeas: loadRecentIdeasCommand,
	appendRecentIdeas: appendRecentIdeasCommand,
	clearRecentIdeas: clearRecentIdeasCommand,

	loadSearchResults: loadSearchResultsCommand,
	appendSearchResults: appendSearchResultsCommand,
	clearSearchResults: clearSearchResultsCommand,

	loadUserIdeas: loadUserIdeasCommand,
	appendUserIdeas: appendUserIdeasCommand,
	clearUserIdeas: clearUserIdeasCommand,

	loadOwnIdeas: loadOwnIdeasCommand,
	appendOwnIdeas: appendOwnIdeasCommand,
	clearOwnIdeas: clearOwnIdeasCommand,

	loadLikedIdeas: loadLikedIdeasCommand,
	appendLikedIdeas: appendLikedIdeasCommand,
	clearLikedIdeas: clearLikeIdeasCommand,

	loadSavedIdeas: loadSavedIdeasCommand,
	appendSavedIdeas: appendSavedIdeasCommand,
	clearSavedIdeas: clearSavedIdeasCommand,

	loadIdea: loadIdeaCommand,
	clearIdea: clearIdeaCommand,

	loadComments: loadCommentsCommand,
	appendComments: appendCommentsCommand,
	clearComments: clearCommentsCommand,

	createIdea: createIdeaCommand,
	editIdea: editIdeaCommand,
	deleteIdea: deleteIdeaCommand,

	createComment: createCommentCommand,
	editComment: editCommentCommand,
	deleteComment: deleteCommentCommand,

	likeIdea: likeIdeaCommand,
	unlikeIdea: unlikeIdeaCommand,

	likeComment: likeCommentCommand,
	unlikeComment: unlikeCommentCommand,

	saveIdea: saveIdeaCommand,
	unsaveIdea: unsaveIdeaCommand
};
