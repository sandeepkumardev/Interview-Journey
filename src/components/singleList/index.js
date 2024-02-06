import { IconButton, Switch, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import DeleteIcon from '@material-ui/icons/Delete';
import { useData } from '../../context';
import AddProperty from './AddProperty';
import PopOver from './PopOver';
import Description from './Description';
import GetPlaced from './GetPlaced';
import { SHORTLISTED } from '../../constants';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTypography-colorTextSecondary': {
      color: '#000',
    },
    '& .MuiButton-root': {
      padding: 0,
    },
    '& .MuiBreadcrumbs-ol': {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowY: 'scroll',
      scrollBehavior: 'smooth',
    },
    '& ::-webkit-scrollbar': {
      display: 'none',
    },
    '& .MuiBreadcrumbs-li': {
      // minWidth: "140px",
    },
    backgroundColor: '#EAEAEA',
  },
  btn: {
    border: 'none',
    borderRadius: '25px',
    fontSize: '12px',
    backgroundColor: '#1976d2',
    color: '#fff',
    cursor: 'pointer',
  },
}));

function SingleList({ data }) {
  const classes = useStyles();
  const {
    _id,
    company_name,
    refrence_name,
    description,
    shortlisted,
    interview_round,
    get_placed,
    rejected,
  } = data;

  const { updateData, deleteData } = useData();

  const handleChange = () => {
    updateData({
      _id,
      type: SHORTLISTED,
      res: { reject: false, resolve: true },
    });
  };

  const deleteCompany = () => {
    deleteData(_id);
  };

  const [descOpen, setdescOpen] = React.useState(false);

  const handleClickOpen = () => {
    setdescOpen(true);
  };

  const handleClose = () => {
    setdescOpen(false);
  };

  return (
    <Box m={1} p={0.5} borderRadius="borderRadius" className={classes.root}>
      <Breadcrumbs>
        <div>
          <Typography variant="h6">{company_name}</Typography>
          <Typography variant="caption" display="block">
            {refrence_name}{' '}
            {description && (
              <button className={classes.btn} onClick={handleClickOpen}>
                Desc
              </button>
            )}
          </Typography>
          <Description handleClose={handleClose} descOpen={descOpen} info={description} />
        </div>

        {/* shortlisted icon  */}
        {shortlisted.resolve && (
          <Typography variant="subtitle2" style={{ color: '#388e3c' }}>
            Shortlisted
          </Typography>
        )}

        {/* shortlisted switch button  */}
        {!shortlisted.reject && !shortlisted.resolve && (
          <div>
            <Typography>
              Shortlisted
              <Switch
                checked={shortlisted.resolve}
                onChange={handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Typography>
          </div>
        )}

        {/* interview rounds  */}
        {interview_round.map((item) => (
          <Box textAlign="center" key={item.id}>
            <PopOver name={item.name} text={item.response} color={false} btnName="Result" />
          </Box>
        ))}

        {/* getPlaced  */}
        {get_placed.status && (
          <Box textAlign="center">
            <GetPlaced packagee={get_placed.package} details={get_placed.details} />
          </Box>
        )}

        {/* end buttons  */}
        {!get_placed.status ? (
          <Box textAlign="center">
            {rejected.status ? (
              <PopOver name="Rejected" text={rejected.reason} color={true} btnName="Reason" />
            ) : (
              <AddProperty interview_round={interview_round} shortlisted={shortlisted} _id={_id} />
            )}
          </Box>
        ) : (
          <IconButton aria-label="delete" onClick={deleteCompany}>
            <DeleteIcon />
          </IconButton>
        )}

        {rejected.status && (
          <IconButton aria-label="delete" onClick={deleteCompany}>
            <DeleteIcon />
          </IconButton>
        )}
      </Breadcrumbs>
    </Box>
  );
}

export default SingleList;
