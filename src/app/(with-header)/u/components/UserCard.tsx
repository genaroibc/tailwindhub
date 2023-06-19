import { UserMetadata } from "@/types/user";
import React from "react";

export function UserCard({ avatar_url, name, user_name }: UserMetadata) {
  return (
    <article className="bg-white rounded-lg shadow-lg p-4 max-w-xs mx-auto">
      <img
        className="w-24 h-24 rounded-full mx-auto mb-4"
        src={avatar_url}
        alt="User Avatar"
      />
      <h2 className="text-xl text-gray-950 font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">{user_name}</p>
    </article>
  );
}
