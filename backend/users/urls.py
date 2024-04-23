from django.urls import path
from .views import (
    CustomUserCreate,
    BlacklistTokenUpdateView,
    UserDeleteView,
    CurrentUserView,
    UserListView,
    UserDetailView,
)

app_name = 'users'

urlpatterns = [
    path("create/", CustomUserCreate.as_view(), name="create_user"),
    path("logout/blacklist/", BlacklistTokenUpdateView.as_view(), name="blacklist"),
    path("users/<int:pk>/", UserDeleteView.as_view(), name="delete-user"),
    path("users/current/", CurrentUserView.as_view(), name="current-user"),
    path("users/", UserListView.as_view(), name="user-list"),
    path("users/<str:email>/", UserDetailView.as_view(), name="user-details"),
]
