import React, {useEffect, useState, Fragment} from 'react';
import { TextField, withStyles, Button } from '@material-ui/core';
import { AssignmentTurnedIn } from '@material-ui/icons';
import useForm from './useForm';
import { connect } from 'react-redux';
import * as actions from '../actions/postMessage';
import ButterToast, { Cinnamon } from 'butter-toast';

const initialFieldValues = {
    title: '',
    message: '',
}

const styles = theme => ({
    root:{
        '& .MuiTextField-root':{
            margin: theme.spacing(1),
        }
    },
    formHeading:{
        display: "flex",
        justifyContent: 'center',
    },
    form:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    postBtn:{
        width:"50%",
        marginTop: "3%",
        marginBottom: "3%"
    }
})

const PostMessageForm = ({classes, ...props}) => {

    useEffect(() => {
        if(props.currentId !== 0){
            setValues({
                ...props.postMessageList.find(x => x._id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])
    const validate = () => {
        let temp = {...errors}
        temp.title = values.title ? "" : "This Field is Required."
        temp.message = values.message ? "" : "This Field is Required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }
    
    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => { 
            ButterToast.raise({
                content: <Cinnamon.Crisp title="ADDED"
                content= "Post Added Successfully"
                scheme= {Cinnamon.Crisp.SCHEME_PURPLE}
                icon = {<AssignmentTurnedIn />}
                />
            }) 
        }
        if(validate()){
            if(props.currentId == 0)
            props.createPostMessage(values, onSuccess)
            else
            props.updatePostMessage(props.currentId, values, onSuccess)
        } 
    }
    return(
        <Fragment>
            <h2 className={classes.formHeading}>ADD NEW POST</h2>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <TextField
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                onChange={handleInputChange}
                {...(errors.title && {error:true, helperText:errors.title})}
                ></TextField>
                <TextField
                name="message"
                variant="outlined"
                label="Message"
                fullWidth
                multiline
                rows={4}
                onChange={handleInputChange}
                {...(errors.message && {error:true, helperText:errors.message})}
                ></TextField>
                <Button 
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
                >
                    Add Post
                </Button>
            </form>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    createPostMessage: actions.create,
    updatePostMessage: actions.update,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessageForm));