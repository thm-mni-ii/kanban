"use strict";
var GlobalRole;
(function (GlobalRole) {
    GlobalRole[GlobalRole["ADMIN"] = 0] = "ADMIN";
    GlobalRole[GlobalRole["MODERATOR"] = 1] = "MODERATOR";
    GlobalRole[GlobalRole["USER"] = 2] = "USER";
})(GlobalRole || (GlobalRole = {}));
var CourseRole;
(function (CourseRole) {
    CourseRole[CourseRole["DOCENT"] = 0] = "DOCENT";
    CourseRole[CourseRole["TUTOR"] = 1] = "TUTOR";
    CourseRole[CourseRole["STUDENT"] = 2] = "STUDENT";
})(CourseRole || (CourseRole = {}));
/**
 * Group Creation
 */
/**
 * Returns the list of groups for a specific course.
 *
 * @param cid - The course id
 * @param visible - Optional filter to filter only for visible groups
 * @returns list of groups for the course with the id 'cid'
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function getGroupList(cid, visible) {
    try {
        let url = `https://feedback.mni.thm.de/api/v1/courses/${cid}/groups`;
        if (visible !== undefined) {
            url += `?visible = ${visible}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
/**
 * Creates a group for a specific course.
 *
 * @param cid - The course id
 * @param postData - The necessary input to create a group
 * @returns created group
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function createGroup(cid, postData) {
    try {
        const response = await fetch(`https://feedback.mni.thm.de/api/v1/courses/${cid}/groups`, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
/**
 * Returns a specific group for a specific course.
 *
 * @param cid - The course id
 * @param gid - The group id
 * @returns the group with the id 'gid' for the course with the id 'cid'
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function getGroup(cid, gid) {
    try {
        const response = await fetch(`https://feedback.mni.thm.de/api/v1/courses/${cid}/groups/${gid}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
/**
 * Updates a specific group for a specific course.
 *
 * @param cid - The course id
 * @param gid - The group id
 * @param postData - The necessary input to update a group
 * @returns the updated group with the id 'gid' for the course with the id 'cid'
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function updateGroup(cid, gid, postData) {
    try {
        const response = await fetch(`https://feedback.mni.thm.de/api/v1/courses/${cid}/groups/${gid}`, {
            method: 'PUT',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
/**
 * Deletes a specific group for a specific course.
 *
 * @param cid - The course id
 * @param gid - The group id
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function deleteGroup(cid, gid) {
    try {
        const response = await fetch(`https://feedback.mni.thm.de/api/v1/courses/${cid}/groups/${gid}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
/**
 * Group Registration
 */
/**
 * Adds a user to a group.
 *
 * @param cid - The course id
 * @param gid - The group id
 * @param uid - The user id
 * @returns An object containing the membership data, including userId, courseId, and groupId.
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function addUserToGroup(cid, gid, uid) {
    try {
        const response = await fetch(`https://feedback.mni.thm.de/api/v1/courses/${cid}/groups/${gid}/users/${uid}`, {
            method: 'PUT',
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
/**
 * Removes a user from a group.
 *
 * @param cid - The course id
 * @param gid - The group id
 * @param uid - The user id
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function removeUserFromGroup(cid, gid, uid) {
    try {
        const response = await fetch(`https://feedback.mni.thm.de/api/v1/courses/${cid}/groups/${gid}/users/${uid}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
/**
 * Removes all users from a group.
 *
 * @param cid - The course id
 * @param gid - The group id
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function removeAllUsersFromGroup(cid, gid) {
    try {
        const response = await fetch(`https://feedback.mni.thm.de/api/v1/courses/${cid}/groups/${gid}/users`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
/**
 * Returns the list of groups of a specific user.
 *
 * @param uid - The user id
 * @returns list of groups of the user with the id 'uid'
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function getUserGroups(uid) {
    try {
        const response = await fetch(`https://feedback.mni.thm.de/api/v1/users/${uid}/groups`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
/**
 * Returns all users of a specific group.
 *
 * @param cid - The course id
 * @param gid - The group id
 * @returns list of course ('cid') participants which are part of the group with the id 'gid'
 *
 * throws {Error} Throws an error if the network request fails or the response is not ok.
 */
async function getGroupMembers(cid, gid) {
    try {
        const response = await fetch(`https://feedback.mni.thm.de/api/v1/courses/${cid}/groups/${gid}/participants`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
//# sourceMappingURL=groupService.js.map