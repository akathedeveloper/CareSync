<div className="flex justify-center items-center h-screen bg-gray-100">

  <form

    onSubmit={handleSubmit}

    className="bg-white p-8 rounded shadow-md w-full max-w-md"

    aria-label="Register Form"

  >

    <h2 className="text-2xl mb-6 font-bold text-center">Register</h2>

    {/* Name */}

    <label htmlFor="name" className="block mb-2 font-semibold">

      Name

    </label>

    <input

      type="text"

      id="name"

      name="name"

      value={formData.name}

      onChange={handleChange}

      className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"

      aria-required="true"

      aria-invalid={errors.name ? "true" : "false"}

    />

    {/* Email */}

    <label htmlFor="email" className="block mb-2 font-semibold">

      Email

    </label>

    <input

      type="email"

      id="email"

      name="email"

      value={formData.email}

      onChange={handleChange}

      className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"

      aria-required="true"

      aria-invalid={errors.email ? "true" : "false"}

    />

    {/* Password */}

    <label htmlFor="password" className="block mb-2 font-semibold">

      Password

    </label>

    <div className="relative">

      <input

        id="password"

        name="password"

        type={showPassword ? "text" : "password"}

        value={formData.password}

        onChange={handleChange}

        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"

        aria-required="true"

        aria-invalid={errors.password ? "true" : "false"}

      />

      <button

        type="button"

        onClick={() => setShowPassword(!showPassword)}

        className="absolute inset-y-0 right-0 pr-2 flex items-center"

        aria-label={showPassword ? "Hide password" : "Show password"}

      >

        {showPassword ? (

          <EyeSlashIcon className="h-5 w-5 text-gray-500" />

        ) : (

          <EyeIcon className="h-5 w-5 text-gray-500" />

        )}

      </button>

    </div>

    {/* Submit */}

    <button

      type="submit"

      className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

    >

      Register

    </button>

  </form>

</div>
        {errors.name && (
          <span className="text-red-500 mb-2 block" role="alert" aria-live="polite">
            {errors.name}
          </span>
        )}

        <label htmlFor="email" className="block mb-2 font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-required="true"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <span className="text-red-500 mb-2 block" role="alert" aria-live="polite">
            {errors.email}
          </span>
        )}

        <label htmlFor="password" className="block mb-2 font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-required="true"
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <span className="text-red-500 mb-2 block" role="alert" aria-live="polite">
            {errors.password}
          </span>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
<div className="flex justify-center items-center h-screen bg-gray-100">

  <form

    onSubmit={handleSubmit}

    className="bg-white p-8 rounded shadow-md w-full max-w-2xl space-y-6"

    aria-label="Register Form"

  >

    {/* Registration Error */}

    <AnimatePresence>

      {error && (

        <motion.div

          initial={{ opacity: 0, scale: 0.95, height: 0 }}

          animate={{ opacity: 1, scale: 1, height: "auto" }}

          exit={{ opacity: 0, scale: 0.95, height: 0 }}

          transition={{ duration: 0.3 }}

          className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 text-red-700 dark:text-red-300 p-4 rounded-xl shadow-sm overflow-hidden"

        >

          <div className="flex items-start">

            <motion.div

              initial={{ scale: 0, rotate: -180 }}

              animate={{ scale: 1, rotate: 0 }}

              className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"

            >

              <svg

                className="w-3 h-3 text-white"

                fill="currentColor"

                viewBox="0 0 20 20"

              >

                <path

                  fillRule="evenodd"

                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"

                  clipRule="evenodd"

                />

              </svg>

            </motion.div>

            <div>

              <p className="font-bold text-sm">Registration Error</p>

              <p className="text-sm">{error}</p>

            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

    {/* ROLE SELECT */}

    <motion.div variants={itemVariants} className="relative">

      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 z-10" />

      <motion.select

        id="role"

        name="role"

        value={formData.role}

        onChange={handleChange}

        className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200/30 bg-white dark:bg-gray-800 appearance-none cursor-pointer text-black"

        whileFocus={{ scale: 1.02 }}

        aria-label="Select Role"

      >

        <option value="patient">Patient</option>

        <option value="doctor">Doctor</option>

        <option value="pharmacist">Pharmacist</option>

      </motion.select>

    </motion.div>

    {/* FORM FIELDS (NAME, CONTACT, PASSWORD, TERMS, SUBMIT, GOOGLE) */}

    {/* ...Include all your other input fields here, same as previous resolved section... */}

    {/* Make sure each input has aria-label or aria-describedby where needed */}

    

    {/* SUBMIT BUTTON */}

    <motion.button

      type="submit"

      disabled={loading || !Object.values(passwordValidity).every(Boolean)}

      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-6 rounded-xl text-lg font-bold shadow-lg shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"

      aria-label="Create Account"

    >

      <AnimatePresence mode="wait">

        {loading ? (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className="flex items-center space-x-2"

          >

            <LoadingSpinner size="sm" color="white" />

            <span>Creating Account...</span>

          </motion.div>

        ) : (

          <motion.span

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className="flex items-center space-x-2"

          >

            <span>Create Account</span>

          </motion.span>

        )}

      </AnimatePresence>

    </motion.button>

    {/* OR CONTINUE WITH GOOGLE */}

    <motion.div className="relative flex items-center my-6">

      <div className="flex-1 border-t border-gray-200 dark:border-gray-600" />

      <motion.span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium">

        Or continue with

      </motion.span>

      <div className="flex-1 border-t border-gray-200 dark:border-gray-600" />

    </motion.div>

    <motion.button

      type="button"

      onClick={handleGoogleSignup}

      className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md transition-all duration-300"

      aria-label="Sign up with Google"

    >

      <img

        src="https://www.svgrepo.com/show/355037/google.svg"

        alt="Google"

        className="h-5 w-5 mr-3"

      />

      <span>Sign up with Google</span>

    </motion.button>

  </form>

</div>

<Footer />

          

          
                      

            
            

export default Register;