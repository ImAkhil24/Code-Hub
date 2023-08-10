import React, { useState } from 'react';
import {
  Link2,
  Link,
  Edit2,
  Trash,
  Copy,
  UserPlus,
  CornerDownRight
} from 'react-feather';
import styles from './styles/hostedinterview.module.css';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { deleteLink,} from '../../actions/interview-link';
import { useDispatch } from 'react-redux';
import CollabModal from '../collab-modal/CollabModal';

const MeetingDetail = ({ link, index }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [openCollab, setOpenCollab] = useState(false);
  const interviewLink = () => {
    return `${window.location.href.replace('hosted-interviews', '')}interview/${
      link.link
    }`;
  };

  const onLink = () => {
    history(`/interview/${link.link}`);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(link.link);
  };

  const onDeleteLink = async () => {
    const res = await deleteLink(link.link);
    dispatch(res);
  };

  const onCollab = () => {
    setOpenCollab(!openCollab);
  };

  return (
    <div key={index}>
      <li className={styles.list}>
        <div className={styles.rowDate}>
          <span>{link.link}</span>
        </div>
        <div className={styles.rowDate}>
          <span>
            <Moment date={link.createdAt} format={'DD/MM/YYYY hh:mm:ss'} />
          </span>
          <div>
            <CornerDownRight
              className={styles.icon}
              style={{ marginLeft: 20, cursor: 'pointer' }}
              onClick={onLink}
            />
            <Copy
              className={styles.icon}
              style={{ marginLeft: 20, cursor: 'pointer' }}
              onClick={onCopy}
            />
            <UserPlus
              className={styles.icon}
              style={{ marginLeft: 20, cursor: 'pointer' }}
              onClick={onCollab}
            />
            <Trash
              className={styles.icon}
              style={{ marginLeft: 20, cursor: 'pointer' }}
              onClick={onDeleteLink}
            />
          </div>
        </div>
      </li>
      <CollabModal open={openCollab} handleClose={onCollab} link={link.link} />
    </div>
  );
};

export default MeetingDetail;
