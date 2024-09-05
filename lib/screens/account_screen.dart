import 'package:flutter/material.dart';
import 'package:auth_dashboard/constants/app_texts.dart';
import 'package:auth_dashboard/constants/responsive.dart';
import 'package:auth_dashboard/utils/utils.dart';
import 'package:auth_dashboard/components/side_menu.dart';
// import 'package:auth_dashboard/components/menu_app_controller.dart';
import 'package:auth_dashboard/widgets/all_post_widget.dart';
import 'package:auth_dashboard/widgets/post_details_widget.dart';
import 'package:auth_dashboard/routing/routes.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: const SideMenu(),
        body: SafeArea(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (Responsive.isDesktop(context))
                const Expanded(
                  child: SideMenu(),
                ),
              Expanded(
                flex: 5,
                child: Column(
                  children: [
                    getLogoutButton(context),
                    _addAccountButton(context),
                    _updateAccountButton(context),
                    _deleteAccountButton(context),
                    add64VerticalSpace(),
                    AllPostWidget()
                  ],
                ),
              ),
            ],
          ),
        ));
  }

  Widget getLogoutButton(BuildContext context) {
    return OutlinedButton(
      style: OutlinedButton.styleFrom(
          surfaceTintColor: Colors.transparent,
          backgroundColor: Colors.white,
          side: BorderSide.none,
          minimumSize: const Size.fromHeight(60),
          shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero)),
      onPressed: () {
        saveUserData("", "", "");
        navigateToLogin(context);
      },
      child: const Text(
        AppTexts.logout,
        style: TextStyle(
            fontSize: 18,
            color: Color.fromARGB(255, 62, 10, 10),
            fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _addAccountButton(BuildContext context) {
    return Align(
      alignment: Alignment.bottomRight,
      child: ElevatedButton(
        onPressed: () {
          //loginUser(context);
        },
        style: ElevatedButton.styleFrom(backgroundColor: Colors.black),
        child: const Text(
          "Add",
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }

  Widget _updateAccountButton(BuildContext context) {
    return Align(
      alignment: Alignment.bottomRight,
      child: ElevatedButton(
        onPressed: () {
          //loginUser(context);
        },
        style: ElevatedButton.styleFrom(backgroundColor: Colors.black),
        child: const Text(
          "Update",
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }

  Widget _deleteAccountButton(BuildContext context) {
    return Align(
      alignment: Alignment.bottomRight,
      child: ElevatedButton(
        onPressed: () {
          //loginUser(context);
        },
        style: ElevatedButton.styleFrom(backgroundColor: Colors.black),
        child: const Text(
          "Delete",
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}
