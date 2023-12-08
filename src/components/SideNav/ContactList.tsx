"use client";
import * as React from "react";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { ListItemAvatar } from "@mui/material";
import { usePathname } from "next/navigation";
import Avatar from "../Avatar/Avatar";

export default function ContactList() {
  const currentRoute = usePathname();

  const contacts = [
    {
      id: 0,
      name: "Brunch this weekend?",
      preview: "Ali Connors — I'll be in your neighborhood doing errands this…",
    },
    {
      id: "1",
      name: "Summer BBQ",
      preview:
        "to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this…",
    },
    {
      id: "2",
      name: "Oui Oui",
      preview:
        "Sandra Adams — Do you have Paris recommendations? Have you ever…",
    },
  ];

  return (
    <List sx={{ width: "100%" }} disablePadding>
      {contacts.map((contact) => (
        <Link
          key={contact.id}
          href={`/conversations/${contact.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem
            alignItems="flex-start"
            sx={{
              background:
                currentRoute === `/conversations/${contact.id}`
                  ? (theme) => theme.palette.grey[100]
                  : "inherit",
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar name={contact.name} img={null} />
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {contact.preview}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          {contacts.length - 1 !== contact.id && (
            <Divider sx={{ ml: 0 }} variant="inset" component="li" />
          )}
        </Link>
      ))}
    </List>
  );
}
