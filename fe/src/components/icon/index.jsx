import React from "react";

import Eye from '../../assets/icons/Eye.svg';
import EyeSlash from '../../assets/icons/EyeSlash.svg';
import Envelope from '../../assets/icons/Envelope.svg';
import Lock from '../../assets/icons/Lock.svg';
import Key from '../../assets/icons/Key.svg';
import Times from '../../assets/icons/Times.svg';
import Check from '../../assets/icons/Check.svg';
import CheckCircle from "../../assets/icons/CheckCircle.svg"
import AngleUp from '../../assets/icons/AngleUp.svg';
import AngleDown from '../../assets/icons/AngleDown.svg';
import User from '../../assets/icons/User.svg';
import ExclamationCircle from '../../assets/icons/ExclamationCircle.svg';
import LogOut from '../../assets/icons/LogOut.svg';
import ChevronLeft from '../../assets/icons/ChevronLeft.svg';
import ChevronRight from '../../assets/icons/ChevronRight.svg';
import Users from '../../assets/icons/Users.svg';
import MessageSquare from '../../assets/icons/MessageSquare.svg';
import Settings from '../../assets/icons/Settings.svg';
import Plus from '../../assets/icons/Plus.svg';
import Search from '../../assets/icons/Search.svg';
import MessageCircle from '../../assets/icons/MessageCircle.svg';
import PaperPlane from "../../assets/icons/PaperPlane.svg"
import File from "../../assets/icons/File.svg"
import Ban from "../../assets/icons/Ban.svg"
import CheckDouble from "../../assets/icons/CheckDouble.svg"
import UserMinus from "../../assets/icons/UserMinus.svg"
import UserPlus from "../../assets/icons/UserPlus.svg"
import Pen from "../../assets/icons/Pen.svg"
import PenSquare from "../../assets/icons/PenSquare.svg"
import Xmark from "../../assets/icons/Xmark.svg"
import Message from "../../assets/icons/Message.svg"
import Trash from "../../assets/icons/Trash.svg"
import TrashSquare from "../../assets/icons/TrashSquare.svg"
import Bin from "../../assets/icons/Bin.svg"
import Xsquare from "../../assets/icons/Xsquare.svg"
import Xcircle from "../../assets/icons/Xcircle.svg"
import XmarkCircle from "../../assets/icons/XmarkCircle.svg"
import XmarkSquare from "../../assets/icons/XmarkSquare.svg"
import ArrowsRotate from "../../assets/icons/ArrowsRotate.svg"
import Bars from "../../assets/icons/Bars.svg"
import RightFromBracket from "../../assets/icons/RightFromBracket.svg"

const icons = {
  Eye,
  EyeSlash,
  Envelope,
  Lock,
  Key,
  Times,
  Check,
  CheckCircle,
  AngleUp,
  AngleDown,
  ExclamationCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  MessageSquare,
  Settings,
  User,
  Plus,
  Search,
  MessageCircle,
  PaperPlane,
  File,
  Ban,
  CheckDouble,
  UserMinus,
  UserPlus,
  Pen,
  PenSquare,
  Xmark,
  Message,
  Trash,
  TrashSquare,
  Bin,
  Xsquare,
  Xcircle,
  XmarkCircle,
  XmarkSquare,
  ArrowsRotate,
  Bars,
  RightFromBracket
}

export default function Icon({ type, className, ...props }) {
  const IconComponent = icons?.[type];
  if (!IconComponent) return null;

  return <IconComponent className={className ?? ""} {...props} />;
}