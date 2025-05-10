import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const {token,refreshtoken}=result;
    res.cookie('refreshToken', refreshtoken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    sendResponse(res, {
      statusCode:200,
      success: true,
      message: 'Login succesful',
      data: {
        token
      },
    });

  });
const refreshToken = catchAsync(async (req, res) => {
    const {refreshToken} = req.cookies;
    
    const result=await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
      statusCode:200,
      success: true,
      message: 'Login succesful',
      data: {
        result
      },
    });

  });

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
    //console.log(req.header);
    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Password is updated succesfully!',
      data: result,
    });
});


export const AuthControllers={
    loginUser,
    refreshToken,
    changePassword,
}