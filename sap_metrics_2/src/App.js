import './App.css';
import React, { useState } from 'react';

import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebar/Sidebar';
import Snapshot from './components/Snapshot/Snapshot';
import Users from './components/Users/Users'; 
import Overview from './components/Overview/Overview'; 
import Trends from './components/Trends/Trends';
import Test from './components/Test/Test';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator, View, Image, useTheme, Text, Heading, useAuthenticator, Button } from '@aws-amplify/ui-react';

import PwcLogo from './imgs/pwc_logo.png';
// import

function App() {

  const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="PwC logo"
            src="../../imgs/pwc_logo.png"
          />
        </View>
      );
    },
  
    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; All Rights Reserved
          </Text>
        </View>
      );
    },
  
    SignIn: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
            textAlign="center"
          >
            Sign in to your account
          </Heading>
        );
      },
      Footer() {
        const { toForgotPassword } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toForgotPassword}
              size="small"
              variation="link"
            >
              Reset Password
            </Button>
          </View>
        );
      },
    },
  
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
            textAlign="center"
          >
            Create a new account
          </Heading>
        );
      },
      Footer() {
        const { toSignIn } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
              variation="link"
            >
              Back to Sign In
            </Button>
          </View>
        );
      },
    },
    ConfirmSignUp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
            textAlign="center"
          >
            Enter Information:
          </Heading>
        );
      },
      // Footer() {
      //   return <Text>Footer Information</Text>;
      // },
    },
    SetupTotp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
            textAlign="center"
          >
            Enter Information:
          </Heading>
        );
      },
      // Footer() {
      //   return <Text>Footer Information</Text>;
      // },
    },
    ConfirmSignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
            textAlign="center"
          >
            Enter Information:
          </Heading>
        );
      },
      // Footer() {
      //   return <Text>Footer Information</Text>;
      // },
    },
    ForgotPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
            textAlign="center"
          >
            Enter Information:
          </Heading>
        );
      },
      // Footer() {
      //   return <Text>Footer Information</Text>;
      // },
    },
    ConfirmResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
            textAlign="center"
          >
            Enter Information:
          </Heading>
        );
      },
      // Footer() {
      //   return <Text>Footer Information</Text>;
      // },
    },
  };
  
  const formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your email',
      },
    },
    signUp: {
      password: {
        label: 'Password:',
        placeholder: 'Enter your Password:',
        isRequired: false,
        order: 2,
      },
      confirm_password: {
        label: 'Confirm Password:',
        order: 1,
      },
    },
    forceNewPassword: {
      password: {
        placeholder: 'Enter your Password:',
      },
    },
    forgotPassword: {
      username: {
        placeholder: 'Enter your email:',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        placeholder: 'Enter your Confirmation Code:',
        label: 'New Label',
        isRequired: false,
      },
      confirm_password: {
        placeholder: 'Enter your Password Please:',
      },
    },
    setupTotp: {
      QR: {
        totpIssuer: 'test issuer',
        totpUsername: 'amplify_qr_test_user',
      },
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
    confirmSignIn: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };

  // Date state for the filter
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handlers for date change
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  // Apply button functionality
  const handleApply = () => {
    console.log('Applied:', { startDate, endDate });
  };

  // Reset button functionality
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <Authenticator loginMechanisms={['email']} formFields={formFields} components={components}>
      {({ signOut, user }) => (
        <Router>
          <div className="App">
            {/* For OG view */}
            {/* <div className="AppGlass">
              <Sidebar logOut={ signOut }/>
              <Routes>
                <Route path="/" element={
                  <>
                  <MainDash />
                  <RightSide />
                  </>
                } />
                <Route path="/snapshot" element={<Snapshot/>} />
                <Route path="/users" element={<Users/>} />
                <Route path="/overview" element={<Overview/>} />
                <Route path="/trends" element={<Trends/>} />
                <Route path="/test" element={<Test/>} />
              </Routes>
            </div> */}

            {/* For Recent planned view */}
            <div className='NewAppGlass'>
              
              {/* Navigation Bar */}
              <nav className="navbar">
                <div className="navbar-left">
                  <img src={ PwcLogo } alt="Symbolic Logo" className="navbar-logo" />
                </div>
                <div className="navbar-right">
                  <input
                    type="datetime-local"
                    className="date-input"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <span className="date-separator">TO</span>
                  <input
                    type="datetime-local"
                    className="date-input"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />

                  {/* Apply Button */}
                  <button className="apply-button" onClick={handleApply}>Apply</button>
                  {/* Reset Button */}
                  <button className="reset-button" onClick={handleReset}>Reset</button>

                </div>
              </nav>

              {/* Upper section */}
              <div className="upper">
                <div className="upper_Left">
                  {/* Space for future content */}
                </div>
                <div className="upper_Right">
                  <div className="upper_Right_upper">
                    {/* Space for future content */}
                  </div>
                  <div className="upper_Right_lower">
                    {/* Space for future content */}
                  </div>
                </div>
              </div>

              {/* Lower section */}
              <div className="lower">
                <div className="lower_Left">
                  {/* Space for future content */}
                </div>
                <div className="lower_Middle">
                  {/* Space for future content */}
                </div>
                <div className="lower_Right">
                  {/* Space for future content */}
                </div>
              </div>

            </div>

          </div>
        </Router> 
      )}
    </Authenticator> 
  );

}

export default App;
