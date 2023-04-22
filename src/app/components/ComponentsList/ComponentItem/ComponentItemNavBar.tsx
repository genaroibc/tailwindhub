"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { ComponentItem } from "@/types";
import { IconCheck, IconCopy, IconHeart } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type Props = {
  textToCopy: string;
  likes: ComponentItem["likes"];
  componentId: string;
};

export function ComponentItemNavBar({
  textToCopy,
  likes: initialLikes,
  componentId,
}: Props) {
  const { supabase } = useSupabase();

  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState<ComponentItem["likes"]>(initialLikes);
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeoutId = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timeoutId);
  }, [copied]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const username = session?.user?.user_metadata.user_name;
      setUserLiked(likes.some((like) => like.author_username === username));
    });
  }, [supabase, likes]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(textToCopy).then(() => setCopied(true));
  };

  const handleLike = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const username = session?.user?.user_metadata.user_name;

    if (!username) return;

    if (userLiked) {
      supabase
        .from("likes")
        .delete()
        .eq("author_username", username)
        .eq("component_id", componentId)
        .then(({ error }) => {
          if (!error) {
            setLikes((currentLikes) =>
              currentLikes.filter((like) => like.author_username !== username)
            );
          }
        });
    } else {
      supabase
        .from("likes")
        .insert({
          author_username: username,
          component_id: componentId,
        })
        .select("*")
        .then(({ data, error }) => {
          if (!error) {
            setLikes((currentLikes) => {
              return [...currentLikes, data[0]];
            });
          }
        });
    }
  };

  return (
    <nav className="flex justify-end gap-2 self-end align-center text-dimmed-black">
      <button
        className="flex place-items-center gap-1 p-2 md:p-3 bg-secondary-color hover:bg-tertiary-color"
        title="Copy code"
        onClick={handleCopyCode}
      >
        {copied ? <IconCheck size="20" /> : <IconCopy size="20" />}
      </button>
      <button
        onClick={handleLike}
        title="Like this component"
        className="flex place-items-center gap-1 p-2 md:p-3 bg-secondary-color hover:bg-tertiary-color"
      >
        {userLiked ? (
          <IconHeart fill="red" size="20" />
        ) : (
          <IconHeart size="20" />
        )}
        {likes.length}
      </button>
    </nav>
  );
}
